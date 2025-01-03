import {FC, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi} from "ag-grid-community";
import {StudentAbsenceType} from "../../../api/dean-api";
import styles from './StudentAbsencesTableContainer.module.css'
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {Option} from "../../../redux/selectorsSlice";
import {
    fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences,
    setStudentAbsences
} from "../../../redux/tablesSlice";

type StudentAbsencesTableContainerType = {
    caseNo?: number | null,
    selectedStudentSemester: Option | null,
    selectedStudentSemesterMonth: Option | null
    absences: StudentAbsenceType[],
    onlyPaidAbsences: boolean
}

export const StudentAbsencesTableContainer: FC<StudentAbsencesTableContainerType> = ({
                                                                                         absences,
                                                                                         selectedStudentSemesterMonth,
                                                                                         selectedStudentSemester,
                                                                                         caseNo,
                                                                                         onlyPaidAbsences
                                                                                     }) => {

    const isLoadingAbsences = useSelector((state: RootState) => state.tables.studentAbsencesTable.isLoadingAbsences)

    const dispatch = useDispatch<AppDispatch>()

    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const columnDefs = useMemo<ColDef<StudentAbsenceType>[]>(() => [
        {field: 'discipline', headerName: 'Название дисциплины'},
        {field: 'date', headerName: 'Дата пропуска'},
        {field: 'lessonType', headerName: 'Тип занятия'},
        {field: 'teacher', headerName: 'Ф.И.О преподавателя'},
        {field: 'absenceTime', headerName: 'Пропущенный часы'},
        {field: 'reasonMsg', headerName: 'Причина пропуска'},
        {valueGetter: p => p.data?.payed ? 'Да' : 'Нет', headerName: 'Оплачено'},
        {valueGetter: p => p.data?.free ? 'Бесплатная' : 'Платная', headerName: 'Тип отработки'},
        {field: 'price', headerName: 'Цена'},
        {field: 'sum', headerName: 'Сумма'},
        {field: 'payedSum', headerName: 'Оплаченная сумма'}
    ], [])

    useEffect(() => {
        (caseNo && selectedStudentSemester && dispatch(fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences({
            caseNo,
            semesterNumber: selectedStudentSemester.value,
            semesterMonthNumber: selectedStudentSemesterMonth?.value || null,
            onlyPaidAbsences
        }))) || dispatch(setStudentAbsences(null))
    }, [caseNo, dispatch, onlyPaidAbsences, selectedStudentSemester, selectedStudentSemesterMonth]);

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingAbsences)
    }, [gridApi, isLoadingAbsences]);

    return <div className={`ag-theme-quartz ${styles.tableContainer}`}>
        <CustomAgGridReactTable
            rowData={absences}
            columnDefs={columnDefs}
            onGridReady={(p) => setGridApi(p.api)}
        />
    </div>
}