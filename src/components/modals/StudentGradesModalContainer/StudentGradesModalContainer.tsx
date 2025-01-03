import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import stylesFromApp from "../../../App.module.css";
import styles from './StudentGradesModalContainer.module.css'
import {StudentGradesTableContainer} from "../../tables/StudentGradesTableContainer/StudentGradesTableContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {CustomSelect} from "../../selects/CustomSelect/CustomSelect";
import {
    fetchStudentSemestersByCaseNo,
    setSelectedStudentSemester,
    setStudentSemesters
} from "../../../redux/selectorsSlice";
import {setStudentStatementsModalIsOpen} from "../../../redux/modalsSlice";
import {setSelectedStudentStatement, setSelectPractices, setStudentStatements} from "../../../redux/tablesSlice";

export const StudentGradesModalContainer: FC = () => {

    const studentStatementsModalIsOpen = useSelector((state: RootState) => state.modals.studentStatementsModalIsOpen)
    const caseNo = useSelector((state: RootState) => state.tables.studentsTable.selectedStudent?.caseNo)
    const studentFullName = useSelector((state: RootState) =>
        `${state.tables.studentsTable.selectedStudent?.surname} ${state.tables.studentsTable.selectedStudent?.name} ${state.tables.studentsTable.selectedStudent?.patronymic}`)
    const statementsContent = useSelector((state: RootState) => state.tables.studentStatementsTable.statementsContent)
    const selectPractices = useSelector((state: RootState) => state.tables.studentStatementsTable.selectPractices)

    const studentSemesters = useSelector((state: RootState) => state.selectors.studentSemesterSelector.options)
    const selectedStudentSemester = useSelector((state: RootState) => state.selectors.studentSemesterSelector.selectedOption)
    const isLoadingSemesters = useSelector((state: RootState) => state.selectors.studentSemesterSelector.optionsIsLoading)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        studentStatementsModalIsOpen && caseNo && dispatch(fetchStudentSemestersByCaseNo(`${caseNo}`))
    }, [dispatch, caseNo, studentStatementsModalIsOpen]);

    return <Modal className={`${stylesFromApp.content}`}
                  isOpen={studentStatementsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentStatementsModalIsOpen(false))
                      dispatch(setStudentStatements(null))
                      dispatch(setSelectedStudentStatement(null))
                      dispatch(setStudentSemesters([]))
                      dispatch(setSelectPractices(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${stylesFromApp.dialogContent} ${stylesFromApp.thirdModal}`}
    >
        <h2>{`Оценки студента: ${studentFullName}`}</h2>
        <div className={styles.selectsContainer}>
            <CustomSelect<false> placeholder={'Выберите семестр'}
                                 value={selectedStudentSemester ?? undefined}
                                 options={studentSemesters}
                                 isLoading={isLoadingSemesters}
                                 onChange={e => dispatch(setSelectedStudentSemester(e))}/>
            <label>
                <input
                    type="checkbox"
                    id={'selectPractices'}
                    checked={selectPractices}
                    onChange={() => dispatch(setSelectPractices(!selectPractices))}
                />
                {selectPractices ? 'С практиками' : 'Без практик'}
            </label>
        </div>
        <h2>{`Ваш средний балл: ${statementsContent?.average}`}</h2>
        <StudentGradesTableContainer caseNo={caseNo} selectedStudentSemester={selectedStudentSemester}
                                     statements={statementsContent?.statements || []} selectPractices={selectPractices}/>
        <button type="button"
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton}`}
                onClick={() => {
                    dispatch(setStudentStatementsModalIsOpen(false))
                    dispatch(setStudentStatements(null))
                    dispatch(setSelectedStudentStatement(null))
                    dispatch(setStudentSemesters([]))
                    dispatch(setSelectPractices(false))
                }}>
            Закрыть
        </button>
    </Modal>
}