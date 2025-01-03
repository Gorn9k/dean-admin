import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import stylesFromApp from "../../../App.module.css";
import styles from './GroupStatementDisciplineModalContainer.module.css'
import {
    GroupStatementDisciplineTableContainer
} from "../../tables/GroupStatementDisciplineTableContainer/GroupStatementDisciplineTableContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setGroupStatementsDisciplineModalIsOpen} from "../../../redux/modalsSlice";
import {setGroupStatementsDiscipline, setSelectedGroupStatementDiscipline} from "../../../redux/tablesSlice";

export const GroupStatementDisciplineModalContainer: FC = () => {

    const groupStatementsDisciplineModalIsOpen = useSelector((state: RootState) => state.modals.groupStatementsDisciplineModalIsOpen)
    const statementsContent = useSelector((state: RootState) => state.tables.groupStatementsDisciplineTable.statementsContent)
    const selectedGroup = useSelector((state: RootState) => state.tables.groupsTable.selectedGroup)

    const dispatch = useDispatch<AppDispatch>();

    return <Modal className={`${stylesFromApp.content}`}
                  isOpen={groupStatementsDisciplineModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setGroupStatementsDisciplineModalIsOpen(false))
                      dispatch(setGroupStatementsDiscipline(null))
                      dispatch(setSelectedGroupStatementDiscipline(null))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${stylesFromApp.dialogContent} ${stylesFromApp.secondModal}`}
    >
        <div className={styles.groupStatisticContainer}>
            <h2>{`Группа: ${selectedGroup?.name}`}</h2>
            <h2>{`, cпециальность: ${selectedGroup?.spec?.name}`}</h2>
        </div>
        <h2 className={styles.smallMarginH2}>{`Дисциплина: ${statementsContent?.statements?.length && statementsContent?.statements[0]?.disciplineName}`}</h2>
        <div className={styles.groupStatisticContainer}>
            <h2>{`Форма контроля: ${statementsContent?.statements?.length && statementsContent?.statements[0]?.examType}`}</h2>
            <h2>{`, cредний балл группы: ${statementsContent?.average}`}</h2>
        </div>
        <GroupStatementDisciplineTableContainer statements={statementsContent?.statements || []}/>
        <button type="button"
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton}`}
                onClick={() => {
                    dispatch(setGroupStatementsDisciplineModalIsOpen(false))
                    dispatch(setGroupStatementsDiscipline(null))
                    dispatch(setSelectedGroupStatementDiscipline(null))
                }}>
            Закрыть
        </button>
    </Modal>
}