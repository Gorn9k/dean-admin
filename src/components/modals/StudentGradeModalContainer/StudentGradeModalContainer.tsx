import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import Modal from "react-modal";
import stylesFromApp from "../../../App.module.css";
import {StudentGradeFormContainer} from "../../forms/StudentGradeFormContainer/StudentGradeFormContainer";
import {setStudentStatementModalIsOpen} from "../../../redux/modalsSlice";
import {setSelectedStudentStatement} from "../../../redux/tablesSlice";

export const StudentGradeModalContainer: FC = () => {

    const studentStatementModalIsOpen = useSelector((state: RootState) => state.modals.studentStatementModalIsOpen)
    const selectedStatement = useSelector((state: RootState) => state.tables.groupStatementsDisciplineTable.selectedStatement)

    const dispatch = useDispatch<AppDispatch>();

    return <Modal className={`${stylesFromApp.content}`}
                  isOpen={studentStatementModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentStatementModalIsOpen(false))
                      dispatch(setSelectedStudentStatement(null))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${stylesFromApp.dialogContent} ${stylesFromApp.thirdModal}`}
    >
        <h2>{selectedStatement ? `Редактирование оценки студента` : `Создание оценки студента`}</h2>
        <StudentGradeFormContainer selectedStatement={selectedStatement}/>
        <button type="button"
                className={`${stylesFromApp.button} ${stylesFromApp.formButton} ${stylesFromApp.singleButton}`}
                onClick={() => {
                    dispatch(setStudentStatementModalIsOpen(false))
                    dispatch(setSelectedStudentStatement(null))
                }}>
            Закрыть
        </button>
    </Modal>
}