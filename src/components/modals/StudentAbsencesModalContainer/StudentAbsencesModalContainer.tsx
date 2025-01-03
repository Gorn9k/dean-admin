import React, {FC, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import stylesFromApp from "../../../App.module.css";
import styles from './StudentAbsencesModalContainer.module.css'
import {StudentAbsencesTableContainer} from "../../tables/StudentAbsencesTableContainer/StudentAbsencesTableContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setStudentAbsencesModalIsOpen} from "../../../redux/modalsSlice";
import {CustomSelect} from "../../selects/CustomSelect/CustomSelect";
import {
    fetchStudentSemestersByCaseNo, setSelectedStudentSemester,
    setSelectedStudentSemesterMonth,
    setStudentSemesters
} from "../../../redux/selectorsSlice";
import {setOnlyPaidAbsences, setStudentAbsences} from "../../../redux/tablesSlice";

export const StudentAbsencesModalContainer: FC = () => {

    const studentAbsencesModalIsOpen = useSelector((state: RootState) => state.modals.studentAbsencesModalIsOpen)
    const caseNo = useSelector((state: RootState) => state.tables.studentsTable.selectedStudent?.caseNo)
    const studentFullName = useSelector((state: RootState) =>
        `${state.tables.studentsTable.selectedStudent?.surname} ${state.tables.studentsTable.selectedStudent?.name} ${state.tables.studentsTable.selectedStudent?.patronymic}`)
    const absences = useSelector((state: RootState) => state.tables.studentAbsencesTable.absencesContent)
    const onlyPaidAbsences = useSelector((state: RootState) => state.tables.studentAbsencesTable.onlyPaidAbsences)

    const selectedStudentSemester = useSelector((state: RootState) => state.selectors.studentSemesterSelector.selectedOption)
    const selectedStudentSemesterMonth = useSelector((state: RootState) => state.selectors.studentSemesterMonthSelector.selectedOption)
    const studentSemesters = useSelector((state: RootState) => state.selectors.studentSemesterSelector.options)
    const isLoadingSemesters = useSelector((state: RootState) => state.selectors.studentSemesterSelector.optionsIsLoading)

    const dispatch = useDispatch<AppDispatch>();

    const studentSemesterMonths = useMemo(() => selectedStudentSemester && selectedStudentSemester.value % 2 === 0 ? [
        {label: 'Январь', value: 1},
        {label: 'Февраль', value: 2},
        {label: 'Март', value: 3},
        {label: 'Апрель', value: 4},
        {label: 'Май', value: 5},
        {label: 'Июнь', value: 6}
    ] : [
        {label: 'Июль', value: 7},
        {label: 'Август', value: 8},
        {label: 'Сентябрь', value: 9},
        {label: 'Октябрь', value: 10},
        {label: 'Ноябрь', value: 11},
        {label: 'Декабрь', value: 12}
    ], [selectedStudentSemester])

    useEffect(() => {
        studentAbsencesModalIsOpen && caseNo && dispatch(fetchStudentSemestersByCaseNo(`${caseNo}`))
    }, [dispatch, caseNo, studentAbsencesModalIsOpen]);

    return <Modal className={`${stylesFromApp.content}`}
                  isOpen={studentAbsencesModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentAbsencesModalIsOpen(false))
                      dispatch(setStudentAbsences(null))
                      dispatch(setStudentSemesters([]))
                      dispatch(setSelectedStudentSemesterMonth(null))
                      dispatch(setSelectedStudentSemester(null))
                      dispatch(setOnlyPaidAbsences(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${stylesFromApp.dialogContent} ${stylesFromApp.thirdModal}`}
    >
        <h2>{`Пропуски студента: ${studentFullName}`}</h2>
        <div className={styles.selectsContainer}>
            <CustomSelect<false> placeholder={'Выберите семестр'}
                                 value={selectedStudentSemester ?? undefined}
                                 options={studentSemesters}
                                 isLoading={isLoadingSemesters}
                                 onChange={e => {
                                     (e && dispatch(setSelectedStudentSemester(e))) ||
                                     (dispatch(setSelectedStudentSemester(null)) && dispatch(setSelectedStudentSemesterMonth(null)))
                                 }}/>
            <CustomSelect<false> placeholder={'Выберите месяц семестра'}
                                 isDisabled={!selectedStudentSemester}
                                 value={studentSemesterMonths.find(value => value.value === selectedStudentSemesterMonth?.value) || null}
                                 options={studentSemesterMonths}
                                 onChange={e => dispatch(setSelectedStudentSemesterMonth(e))}/>
            <label>
                <input
                    type="checkbox"
                    id={'onlyPaidAbsences'}
                    checked={onlyPaidAbsences}
                    onChange={() => dispatch(setOnlyPaidAbsences(!onlyPaidAbsences))}
                />
                {onlyPaidAbsences ? 'Только неоплаченные' : 'Все отработки'}
            </label>
        </div>
        <h2>{`Общее количество часов отработок: ${absences?.hoursAll}`}</h2>
        <h2>{`Количество часов неоплаченных отработок: ${absences?.hoursNotPaid}`}</h2>
        <h2>{`Количество часов оплаченных отработок: ${absences?.hoursPaid}`}</h2>
        <StudentAbsencesTableContainer caseNo={caseNo} selectedStudentSemester={selectedStudentSemester}
                                       selectedStudentSemesterMonth={selectedStudentSemesterMonth}
                                       absences={absences?.absences || []} onlyPaidAbsences={onlyPaidAbsences}/>
        <button type="button"
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton}`}
                onClick={() => {
                    dispatch(setStudentAbsencesModalIsOpen(false))
                    dispatch(setStudentAbsences(null))
                    dispatch(setStudentSemesters([]))
                    dispatch(setSelectedStudentSemesterMonth(null))
                    dispatch(setSelectedStudentSemester(null))
                    dispatch(setOnlyPaidAbsences(false))
                }}>
            Закрыть
        </button>
    </Modal>
}