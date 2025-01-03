import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import styles from "../../../App.module.css";
import {StudentParentFormContainer} from "../../forms/StudentParentFormContainer/StudentParentFormContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setStudentParentsModalIsOpen} from "../../../redux/modalsSlice";
import {ParentType, StudentType} from "../../../api/dean-api";
import {FormikErrors} from "formik";

export const StudentParentModalContainer: FC<{
    selectedStudentParent: ParentType | null
    setSelectedStudentParent: (value: ParentType | null) => void
    parents: ParentType[]
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<StudentType>>
}> = ({selectedStudentParent, setSelectedStudentParent, parents, setFieldValue}) => {

    const studentParentsModalIsOpen = useSelector((state: RootState) => state.modals.studentParentsModalIsOpen);

    const dispatch = useDispatch<AppDispatch>();

    return <Modal className={styles.content}
                  isOpen={studentParentsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentParentsModalIsOpen(false))
                      setSelectedStudentParent(null)
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${styles.dialogContent} ${styles.thirdModal}`}
    >
        <h2>{selectedStudentParent ? `Редактирование представителя студента` : `Создание представителя студента`}</h2>
        <StudentParentFormContainer selectedStudentParent={selectedStudentParent} parents={parents} setFieldValue={setFieldValue}/>
        <button type="button"
                className={`${styles.button} ${styles.formButton} ${styles.singleButton}`}
                onClick={() => {
                    dispatch(setStudentParentsModalIsOpen(false))
                    setSelectedStudentParent(null)
                }}>
            Закрыть
        </button>
    </Modal>
}