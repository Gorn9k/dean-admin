import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi} from "ag-grid-community";
import {setGroupStatementsDisciplineModalIsOpen} from "../../../redux/modalsSlice";
import {GroupStatementType} from "../../../api/dean-api";
import styles from './GroupStatementTableContainer.module.css'
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {
    fetchGroupStatementsByGroupIdAndSemesterNumber,
    setGroupStatements,
    setSelectedGroupStatement
} from "../../../redux/tablesSlice";

type GroupStatementTableContainerType = {
    groupId?: number | null
    selectedSemesterNumber: number | null
}

export const GroupStatementTableContainer: FC<GroupStatementTableContainerType> = ({
                                                                                       groupId,
                                                                                       selectedSemesterNumber
                                                                                   }) => {

    const statements = useSelector((state: RootState) => state.tables.groupStatementsTable.statements)
    const isLoadingStatements = useSelector((state: RootState) => state.tables.groupStatementsTable.isLoadingStatements)

    const dispatch = useDispatch<AppDispatch>()

    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const columnDefs = useMemo<ColDef<GroupStatementType>[]>(() => [
        {field: 'course', headerName: 'Курс группы'},
        {field: 'studyPlanTeacher', headerName: 'Ф.И.О преподавателя'},
        {field: 'discipline', headerName: 'Название дисциплины'},
        {field: 'examType', headerName: 'Тип экзамена'},
        {field: 'semesterType', headerName: 'Семестр'},
        {field: 'statementDate', headerName: 'Дата ведомости'},
        {field: 'groupStatementNumber', headerName: 'Номер ведомости для группы'}
    ], [])

    const onRowDoubleClicked = useCallback((groupStatementData: GroupStatementType) => {
        groupStatementData && dispatch(setSelectedGroupStatement(groupStatementData)) && dispatch(setGroupStatementsDisciplineModalIsOpen(true))
    }, [dispatch])

    useEffect(() => {
        (groupId && selectedSemesterNumber && dispatch(fetchGroupStatementsByGroupIdAndSemesterNumber({
            groupId: groupId,
            semesterNumber: selectedSemesterNumber
        }))) || dispatch(setGroupStatements([]))
    }, [dispatch, groupId, selectedSemesterNumber]);

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingStatements)
    }, [gridApi, isLoadingStatements]);

    return <div className={`ag-theme-quartz ${styles.groupStatementTableContainer}`}>
        <CustomAgGridReactTable
            rowData={statements}
            columnDefs={columnDefs}
            onGridReady={(p) => setGridApi(p.api)}
            onRowDoubleClicked={p => onRowDoubleClicked(p.data)}
        />
    </div>

}