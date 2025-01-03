import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import styles from "./SearchStudentPageContainer.module.css";
import {StudentTableContainer} from "../../tables/StudentTableContainer/StudentTableContainer";
import {fetchStudentsByCaseNo, setStudents} from "../../../redux/tablesSlice";

export const SearchStudentPageContainer: FC = () => {

    const students = useSelector((state: RootState) => state.tables.studentsTable.students)
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (searchInputValue && searchInputValue.length > 2) {
            dispatch(fetchStudentsByCaseNo(searchInputValue))
        }
        return () => {
            dispatch(setStudents([]))
        }
    }, [dispatch, searchInputValue]);

    return <>
        <input className={styles.searchInput} value={searchInputValue} id={'searchInput'}
               placeholder={'Введите номер зачётки'}
               onChange={(p) =>
                   setSearchInputValue(p.target.value.replace(/[^0-9]/g, '').slice(0, 5))}/>
        <StudentTableContainer watchDeletedStudents={true} students={students}/>
    </>
}