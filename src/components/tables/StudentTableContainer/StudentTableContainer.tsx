import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi, RowClassParams} from "ag-grid-community";
import {StudentType} from "../../../api/dean-api";
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {setStudentModalIsOpen} from "../../../redux/modalsSlice";
import styles from "./StudentTableContainer.module.css";
import stylesFromApp from '../../../App.module.css'
import {setMenuPosition, setMenuVisible, setSelectedRowId} from "../../../redux/menuSlice";
import {StudentInfoMenuContainer} from "../../modals/StudentInfoMenuContainer/StudentInfoMenuContainer";
import {setSelectedStudent} from "../../../redux/tablesSlice";

export const StudentTableContainer: FC<{
    className?: string,
    watchDeletedStudents?: boolean,
    students: StudentType[]
}> = ({className, watchDeletedStudents, students}) => {

    const isLoadingStudents = useSelector((state: RootState) => state.tables.studentsTable.isLoadingStudents)
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const dispatch = useDispatch<AppDispatch>()

    const columnDefs = useMemo<ColDef<StudentType>[]>(() => [
        {field: 'caseNo', headerName: 'Номер зачётки'},
        {field: 'surname', headerName: 'Фамилия'},
        {field: 'name', headerName: 'Имя'},
        {field: 'patronymic', headerName: 'Отчество'},
        {field: 'phone', headerName: 'Номер телефона'},
        {field: 'status', hide: true, sort: "asc"}
    ], [])

    const handleHoverInside = useCallback((event: any) => {
        if (!(event?.event?.toElement?.ariaColIndex === '1'))
            return;
        dispatch(setSelectedRowId(event.data))
        dispatch(setMenuVisible(true));
        dispatch(setMenuPosition({x: event.event.clientX + 10, y: event.event.clientY - 50}));
    }, [dispatch]);

    const handleHoverOutside = useCallback((e: any) => {
        if (!e.event.toElement?.classList.contains(stylesFromApp.menuListContainer) &&
            !(e.event.toElement?.ariaColIndex === `${Number.parseInt(e.event.fromElement?.ariaColIndex) + 1}`)) {
            dispatch(setMenuVisible(false))
            dispatch(setSelectedRowId(null))
        }
    }, [dispatch]);

    const onRowDoubleClicked = useCallback((studentData: StudentType) => {
        studentData && dispatch(setSelectedStudent(studentData)) && dispatch(setStudentModalIsOpen(true))
        //&& dispatch(setStudentParents(studentData.parents ?? [])) && dispatch(setStudentEducations(studentData.educations ?? []))
    }, [dispatch])

    const getRowStyle = useCallback((p: RowClassParams<StudentType>) => {
        if (p.data?.status !== 'ACTIVE')
            return {backgroundColor: 'rgb(255, 132, 132)'}
        else if (p.data?.paymentType === 'Платно')
            return {backgroundColor: '#c0c0c0'}
        return undefined
    }, [])

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingStudents)
    }, [gridApi, isLoadingStudents]);

    return <>
        <div className={`ag-theme-quartz ${className ?? styles.studentTableContainer}`}>
            <CustomAgGridReactTable
                rowData={!watchDeletedStudents ? students.filter(value => value.status !== 'DELETED') : students}
                columnDefs={columnDefs}
                onGridReady={(p) => setGridApi(p.api)}
                onRowDoubleClicked={p => onRowDoubleClicked(p.data)}
                getRowStyle={p => getRowStyle(p)}
                onCellMouseOver={e => handleHoverInside(e)}
                onCellMouseOut={e => handleHoverOutside(e)}
                suppressScrollOnNewData/>
        </div>
        <StudentInfoMenuContainer/>
    </>

}