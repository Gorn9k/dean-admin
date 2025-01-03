import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import styles from "../../../App.module.css";
import {StudentInfoFormContainer} from "../../forms/StudentInfoFormContainer/StudentInfoFormContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setStudentModalIsOpen} from "../../../redux/modalsSlice";
import {setSelectedStudent} from "../../../redux/tablesSlice";
import {setIsOnEditMode} from "../../../redux/studentSlice";

export const StudentInfoModalContainer: FC = () => {

    const studentModalIsOpen = useSelector((state: RootState) => state.modals.studentModalIsOpen)

    const dispatch = useDispatch<AppDispatch>();

    return <Modal className={`${styles.content} ${styles.studentInfoContent}`}
                  isOpen={studentModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentModalIsOpen(false))
                      dispatch(setSelectedStudent(null))
                      dispatch(setIsOnEditMode(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${styles.dialogContent} ${styles.secondModal}`}
    >
        <StudentInfoFormContainer/>
    </Modal>
}