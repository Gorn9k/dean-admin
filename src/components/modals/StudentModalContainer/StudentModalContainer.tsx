import React, {FC, useEffect, useMemo} from "react";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import stylesFromApp from "../../../App.module.css";
import styles from './StudentModalContainer.module.css'
import {StudentTableContainer} from "../../tables/StudentTableContainer/StudentTableContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setStudentModalIsOpen, setStudentsModalIsOpen} from "../../../redux/modalsSlice";
import {setMenuVisible} from "../../../redux/menuSlice";
import {
    fetchStudentsByGroupId,
    setSelectedGroup,
    setStudents,
    setWatchDeletedStudents
} from "../../../redux/tablesSlice";

export const StudentModalContainer: FC = () => {

    const students = useSelector((state: RootState) => state.tables.studentsTable.students)
    const studentsModalIsOpen = useSelector((state: RootState) => state.modals.studentsModalIsOpen);
    const selectedGroup = useSelector((state: RootState) => state.tables.groupsTable.selectedGroup)
    const watchDeletedStudents = useSelector((state: RootState) => state.tables.studentsTable.watchDeletedStudents)

    const dispatch = useDispatch<AppDispatch>();
    
    const [studentsCount, studentsPaidCount, studentNotPaidCount] = useMemo(() => {
        let studentCount = 0;
        let studentsPaidCount = 0;
        let studentNotPaidCount = 0;
        
        students.forEach(student => {
            if (watchDeletedStudents || (!watchDeletedStudents && student?.status !== 'DELETED')) {
                studentCount++;
                (student?.paymentType === 'Бюджет' && studentNotPaidCount++) || (student?.paymentType === 'Платно' && studentsPaidCount++)
            }
        })
        
        return [studentCount, studentsPaidCount, studentNotPaidCount]
    }, [students, watchDeletedStudents])

    useEffect(() => {
        selectedGroup?.id && dispatch(fetchStudentsByGroupId(selectedGroup.id))
    }, [dispatch, selectedGroup]);

    return <Modal className={stylesFromApp.content}
                  isOpen={studentsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentsModalIsOpen(false))
                      dispatch(setSelectedGroup(null))
                      dispatch(setStudents([]))
                      dispatch(setMenuVisible(false));
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${stylesFromApp.dialogContent} ${stylesFromApp.firstModal}`}
    >
        <h2>{`Список студентов в группе ${selectedGroup?.name}`}</h2>
        <button type="button"
                onClick={() => dispatch(setStudentModalIsOpen(true))}
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton} ${styles.addButtonMargin}`}>
            Добавить студента
        </button>
        <div className={styles.groupStatisticContainer}>
            <h2>{`Всего студентов: ${studentsCount}`}</h2>
            <h2>{`, платников: ${studentsPaidCount}`}</h2>
            <h2>{`, бюджетников: ${studentNotPaidCount}`}</h2>
        </div>
        <label className={styles.checkboxStudents}>
            <input
                type="checkbox"
                id={'watchDeletedStudents'}
                checked={watchDeletedStudents}
                onChange={() => dispatch(setWatchDeletedStudents(!watchDeletedStudents))}
            />
            {watchDeletedStudents ? 'С отчисленными студентами' : 'Без отчисленных студентов'}
        </label>
        <StudentTableContainer students={students} className={styles.tableContainerHeight} watchDeletedStudents={watchDeletedStudents}/>
        <button type="button"
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton}`}
                onClick={() => {
                    dispatch(setStudentsModalIsOpen(false))
                    dispatch(setSelectedGroup(null))
                    dispatch(setStudents([]))
                    dispatch(setMenuVisible(false));
                }}>
            Закрыть
        </button>
    </Modal>
}