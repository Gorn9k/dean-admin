import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import styles from "../../../App.module.css";
import {GroupStatementTableContainer} from "../../tables/GroupStatementTableContainer/GroupStatementTableContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {CustomSelect} from "../../selects/CustomSelect/CustomSelect";
import {
    fetchGroupSemestersByGroupId,
    setSelectedGroupSemester,
    setStudentSemesters
} from "../../../redux/selectorsSlice";
import {setGroupStatementsModalIsOpen} from "../../../redux/modalsSlice";
import {setSelectedGroup, setSelectedStudentStatement, setStudentStatements} from "../../../redux/tablesSlice";

export const GroupStatementModalContainer: FC = () => {

    const groupStatementsModalIsOpen = useSelector((state: RootState) => state.modals.groupStatementsModalIsOpen)
    const selectedGroup = useSelector((state: RootState) => state.tables.groupsTable.selectedGroup)

    const groupSemesters = useSelector((state: RootState) => state.selectors.groupSemesterSelector.options)
    const selectedGroupSemester = useSelector((state: RootState) => state.selectors.groupSemesterSelector.selectedOption)
    const isLoadingSemesters = useSelector((state: RootState) => state.selectors.groupSemesterSelector.optionsIsLoading)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        groupStatementsModalIsOpen && selectedGroup?.id && dispatch(fetchGroupSemestersByGroupId(selectedGroup.id))
    }, [dispatch, groupStatementsModalIsOpen, selectedGroup]);

    return <Modal className={`${styles.content}`}
                  isOpen={groupStatementsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setGroupStatementsModalIsOpen(false))
                      dispatch(setSelectedGroup(null))
                      dispatch(setStudentSemesters([]))
                      dispatch(setSelectedStudentStatement(null))
                      dispatch(setStudentStatements(null))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${styles.dialogContent} ${styles.firstModal}`}
    >
        <h2>{`Ведомость по дисциплинам группы: ${selectedGroup?.name}`}</h2>
        <CustomSelect<false> placeholder={'Выберите семестр'}
                             className={styles.singleSelect}
                             value={selectedGroupSemester ?? undefined}
                             options={groupSemesters}
                             isLoading={isLoadingSemesters}
                             onChange={e => dispatch(setSelectedGroupSemester(e))}/>
        <GroupStatementTableContainer groupId={selectedGroup?.id} selectedSemesterNumber={selectedGroupSemester?.value ?? null}/>
        <div className={`${styles.buttonsContainer}`}>
            <button type="button"
                    className={`${styles.button} ${styles.formButton}`}
                    onClick={() => {
                        dispatch(setGroupStatementsModalIsOpen(false))
                        dispatch(setSelectedGroup(null))
                        dispatch(setStudentSemesters([]))
                        dispatch(setSelectedStudentStatement(null))
                        dispatch(setStudentStatements(null))
                    }}>
                Закрыть
            </button>
        </div>
    </Modal>
}