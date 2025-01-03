import {FC} from "react";
import {FacultySelectContainer} from "../../selects/FacultySelectContainer/FacultySelectContainer";
import styles from './SearchGroupPage.module.css'
import {EducationYearSelectContainer} from "../../selects/EducationYearSelectContainer/EducationYearSelectContainer";
import {SemesterSelectContainer} from "../../selects/SemesterSelectContainer/SemesterSelectContainer";
import {GroupTableContainer} from "../../tables/GroupTableContainer/GroupTableContainer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export const SearchGroupPage: FC = () => {

    const groups = useSelector((state: RootState) => state.tables.groupsTable.groups)

    return <>
        <div className={styles.selectsContainer}>
            <FacultySelectContainer/>
            <EducationYearSelectContainer/>
            <SemesterSelectContainer/>
        </div>
        <GroupTableContainer groups={groups}/>
        <h2>{`Всего групп: ${groups.length}`}</h2>
    </>
}