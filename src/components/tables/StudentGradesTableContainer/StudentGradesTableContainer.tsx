import {FC, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi} from "ag-grid-community";
import {StudentStatementType} from "../../../api/dean-api";
import styles from './StudentGradesTableContainer.module.css'
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {Option} from "../../../redux/selectorsSlice";
import {
    fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices,
    setStudentStatements
} from "../../../redux/tablesSlice";

export const StudentGradesTableContainer: FC<{
    caseNo?: number | null,
    selectedStudentSemester: Option | null,
    statements: StudentStatementType[],
    selectPractices: boolean
}> = ({caseNo, selectedStudentSemester, statements, selectPractices}) => {

    const isLoadingStatements = useSelector((state: RootState) => state.tables.studentStatementsTable.isLoadingStatements)

    const dispatch = useDispatch<AppDispatch>()

    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const columnDefs = useMemo<ColDef<StudentStatementType>[]>(() => [
        {field: 'examType', headerName: 'Форма контроля'},
        {field: 'disciplineName', headerName: 'Дисциплина'},
        {field: 'grade', headerName: 'Отметка'},
        {field: 'hours', headerName: 'Количество часов'},
        {field: 'testPoints', headerName: 'Количество зачётных единиц'},
        {valueGetter: params => params.data?.teachers?.toString(), headerName: 'Преподаватель'},
        {field: 'dateOfExam', headerName: 'Дата'}
    ], [])

    useEffect(() => {
        (caseNo && selectedStudentSemester && dispatch(fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices({
            caseNo: caseNo,
            semesterNumber: selectedStudentSemester.value,
            selectPractices: selectPractices
        }))) || dispatch(setStudentStatements(null))
    }, [caseNo, dispatch, selectPractices, selectedStudentSemester]);

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingStatements)
    }, [gridApi, isLoadingStatements]);

    return <div className={`ag-theme-quartz ${styles.tableContainer}`}>
        <CustomAgGridReactTable
            rowData={statements}
            columnDefs={columnDefs}
            onGridReady={(p) => setGridApi(p.api)}
        />
    </div>
}