import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {ColDef, GridApi} from "ag-grid-community";
import {GroupType} from "../../../api/dean-api";
import {setGroupStatementsModalIsOpen, setStudentsModalIsOpen} from "../../../redux/modalsSlice";
import styles from "./GroupTableContainer.module.css";
import {CustomAgGridReactTable} from "../CustomAgGridReactTable/CustomAgGridReactTable";
import {fetchGroupsByFacultyIdAndLearnYearAndSemester, setSelectedGroup} from "../../../redux/tablesSlice";

export const GroupTableContainer: FC<{groups: GroupType[]}> = ({groups}) => {

    const selectedFaculty = useSelector((state: RootState) => state.selectors.facultySelector.selectedOption)
    const selectedLearnYear = useSelector((state: RootState) => state.selectors.learnYearSelector.selectedOption)
    const selectedSemester = useSelector((state: RootState) => state.selectors.semesterSelector.selectedOption)
    const isLoadingGroups = useSelector((state: RootState) => state.tables.groupsTable.isLoadingGroups)

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [selectedRow, setSelectedRow] = useState<GroupType | null>(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const menuRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<AppDispatch>()

    const columnDefs = useMemo<ColDef<GroupType>[]>(() => [
        {field: 'name', headerName: 'Название группы'},
        {valueGetter: p => p.data?.spec?.name, headerName: 'Название специальности'},
        {field: 'yearStart', headerName: 'Год образования'},
        {field: 'yearEnd', headerName: 'Год выпуска'},
        {field: 'currentCourse', headerName: 'Текущий курс', sort: 'asc'}
    ], [])

    const onRowDoubleClicked = useCallback((groupData: GroupType) => {
        console.log(groupData)
        groupData && dispatch(setSelectedGroup(groupData)) && dispatch(setStudentsModalIsOpen(true))
    }, [dispatch])

    const onCellContextMenu = useCallback((event: any) => {
        setSelectedRow(event.data);
        setMenuPosition({x: event.event.clientX, y: event.event.clientY});
        setMenuVisible(true);
    }, []);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuVisible(false)
        }
    }, []);

    const handleMenuAction = useCallback(() => {
        dispatch(setGroupStatementsModalIsOpen(true))
        dispatch(setSelectedGroup(selectedRow))
        setMenuVisible(false)
    }, [dispatch, selectedRow]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        dispatch(fetchGroupsByFacultyIdAndLearnYearAndSemester(
            {
                facultyId: selectedFaculty?.value ?? undefined,
                learnYear: selectedLearnYear?.value ?? undefined,
                semester: selectedSemester?.label ?? undefined,
            }
        ))
    }, [dispatch, selectedFaculty, selectedLearnYear, selectedSemester]);

    useEffect(() => {
        gridApi && gridApi.setGridOption('loading', isLoadingGroups)
    }, [gridApi, isLoadingGroups]);

    return <>
        <div className={`ag-theme-quartz ${styles.groupTableContainer}`}
             onContextMenu={(e) => e.preventDefault()}>
            <CustomAgGridReactTable
                rowData={groups}
                columnDefs={columnDefs}
                onGridReady={(p) => setGridApi(p.api)}
                onRowDoubleClicked={p => onRowDoubleClicked(p.data)}
                onCellContextMenu={onCellContextMenu}
            />
        </div>
        {menuVisible && (
            <div
                ref={menuRef}
                style={{
                    top: menuPosition.y,
                    left: menuPosition.x
                }}
                className={styles.menuListContainer}
            >
                <ul className={styles.menuList}>
                    <li className={styles.menuListItem}
                        onClick={() => handleMenuAction()}
                    >
                        Ведомость
                    </li>
                </ul>
            </div>
        )}
    </>
}