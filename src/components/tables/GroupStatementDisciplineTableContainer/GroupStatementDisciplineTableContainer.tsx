import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi} from "ag-grid-community";
import {StudentStatementType} from "../../../api/dean-api";
import styles from './GroupStatementDisciplineTableContainer.module.css';
import stylesFromApp from '../../../App.module.css'
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {fetchStudentById, setMenuPosition, setMenuVisible, setSelectedRowId} from "../../../redux/menuSlice";
import {StudentInfoMenuContainer} from "../../modals/StudentInfoMenuContainer/StudentInfoMenuContainer";
import {
    fetchGroupStatementsDisciplineByStatementId,
    setSelectedGroupStatementDiscipline
} from "../../../redux/tablesSlice";
import {setStudentStatementModalIsOpen} from "../../../redux/modalsSlice";

type GroupStatementDisciplineTableContainerType = {
    statements: StudentStatementType[]
}

export const GroupStatementDisciplineTableContainer: FC<GroupStatementDisciplineTableContainerType> = ({statements}) => {

    const selectedStatement = useSelector((state: RootState) => state.tables.groupStatementsTable.selectedStatement)
    const isLoadingStatements = useSelector((state: RootState) => state.tables.groupStatementsDisciplineTable.isLoadingStatements)

    const dispatch = useDispatch<AppDispatch>()

    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const columnDefs = useMemo<ColDef<StudentStatementType>[]>(() => [
        {field: 'student', headerName: 'Ф.И.О студента'},
        {field: 'examType', headerName: 'Форма контроля'},
        {field: 'grade', headerName: 'Отметка'},
        {field: 'hours', headerName: 'Количество часов'},
        {field: 'testPoints', headerName: 'Количество зачётных единиц'},
        {valueGetter: params => params.data?.teachers?.toString(), headerName: 'Преподаватель'},
        {field: 'dateOfExam', headerName: 'Дата'}
    ], [])

    const handleHoverInside = useCallback((event: any) => {
        event.column.colId === 'student' &&
        dispatch(fetchStudentById(event.data.studentId)) &&
        dispatch(setMenuPosition({x: event.event.clientX + 10, y: event.event.clientY - 50}));
    }, [dispatch]);

    const handleHoverOutside = useCallback((e: any) => {
        if (!e.event.toElement?.classList.contains(stylesFromApp.menuListContainer)) {
            dispatch(setMenuVisible(false))
            dispatch(setSelectedRowId(null))
        }
    }, [dispatch]);

    useEffect(() => {
        selectedStatement?.id && dispatch(fetchGroupStatementsDisciplineByStatementId(selectedStatement.id))
    }, [dispatch, selectedStatement]);

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingStatements)
    }, [gridApi, isLoadingStatements]);

    return <>
        <div className={`ag-theme-quartz ${styles.groupStatementDisciplineTableContainer}`}>
            <CustomAgGridReactTable
                rowData={statements}
                columnDefs={columnDefs}
                onGridReady={(p) => setGridApi(p.api)}
                getRowStyle={params => {
                    if (params.data?.isRetake === true) {
                        return {backgroundColor: 'yellow'};
                    }
                    return undefined
                }}
                onRowDoubleClicked={(p) => {
                    dispatch(setStudentStatementModalIsOpen(true))
                    dispatch(setSelectedGroupStatementDiscipline(p.data))
                }}
                onCellMouseOver={e => handleHoverInside(e)}
                onCellMouseOut={e => handleHoverOutside(e)}
                suppressScrollOnNewData/>
        </div>
        <StudentInfoMenuContainer/>
    </>
}