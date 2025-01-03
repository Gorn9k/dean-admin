import styles from './App.module.css';
import {FC, useEffect} from "react";
import {SearchGroupPage} from "./components/pages/SearchGroupPage/SearchGroupPage";
import Modal from "react-modal";
import {Header} from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom';
import {SearchStudentPageContainer} from "./components/pages/SearchStudentPageContainer/SearchStudentPageContainer";
import {NotFound} from "./components/pages/NotFound/NotFound";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./redux/store";
import Preloader from "./components/Preloader/Preloader";
import {fetchHasAuthority} from "./redux/modalsSlice";
import {StudentModalContainer} from './components/modals/StudentModalContainer/StudentModalContainer';
import {StudentInfoModalContainer} from './components/modals/StudentInfoModalContainer/StudentInfoModalContainer';
import {
    StudentAbsencesModalContainer
} from './components/modals/StudentAbsencesModalContainer/StudentAbsencesModalContainer';
import {
    GroupStatementDisciplineModalContainer
} from './components/modals/GroupStatementDisciplineModalContainer/GroupStatementDisciplineModalContainer';
import {StudentGradesModalContainer} from './components/modals/StudentGradesModalContainer/StudentGradesModalContainer';
import {
    GroupStatementModalContainer
} from './components/modals/GroupStatementModalContainer/GroupStatementModalContainer';
import {StudentGradeModalContainer} from "./components/modals/StudentGradeModalContainer/StudentGradeModalContainer";

Modal.setAppElement('#root');

export const App: FC = () => {

    const hasAuthority = useSelector((state: RootState) => state.user.hasAuthority)
    //const hasAuthority = true

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        !hasAuthority && dispatch(fetchHasAuthority())
    }, [dispatch, hasAuthority]);

    return hasAuthority ? <>
        <StudentGradeModalContainer/>
        <GroupStatementDisciplineModalContainer/>
        <GroupStatementModalContainer/>
        <StudentAbsencesModalContainer/>
        <StudentGradesModalContainer/>
        <StudentInfoModalContainer/>
        <StudentModalContainer/>
        <Header/>
        <main>
            <Routes>
                <Route path="/groups" element={<SearchGroupPage/>}/>
                <Route path="/students" element={<SearchStudentPageContainer/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </main>
    </> : <div className={styles.waitContainer}>
        <h1 className={styles.waitMessage}>Ожидание ответа от сервера авторизации</h1>
        <Preloader/>
    </div>
}