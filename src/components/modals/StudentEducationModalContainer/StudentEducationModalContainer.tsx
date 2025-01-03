import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import styles from "../../../App.module.css";
import {StudentEducationFormContainer} from "../../forms/StudentEducationFormContainer/StudentEducationFormContainer";
import {AppDispatch, RootState} from "../../../redux/store";
import {setStudentEducationsModalIsOpen} from "../../../redux/modalsSlice";
import {EducationType, StudentType} from "../../../api/dean-api";
import {FormikErrors} from "formik";

export const StudentEducationModalContainer: FC<{
    selectedStudentEducation: EducationType | null
    setSelectedStudentEducation: (value: EducationType | null) => void
    educations: EducationType[]
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<StudentType>>
}> = ({setSelectedStudentEducation, selectedStudentEducation, educations, setFieldValue }) => {

    const studentEducationsModalIsOpen = useSelector((state: RootState) => state.modals.studentEducationsModalIsOpen);

    const dispatch = useDispatch<AppDispatch>();

    return <Modal className={styles.content}
                  isOpen={studentEducationsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setStudentEducationsModalIsOpen(false))
                      setSelectedStudentEducation(null)
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={`${styles.dialogContent} ${styles.thirdModal}`}
    >
        <h2>{selectedStudentEducation ? `Редактирование иного образования студента` : `Создание иного образования студента`}</h2>
        <StudentEducationFormContainer selectedStudentEducation={selectedStudentEducation} educations={educations} setFieldValue={setFieldValue}/>
        <button type="button"
                className={`${styles.button} ${styles.formButton} ${styles.singleButton}`}
                onClick={() => {
                    dispatch(setStudentEducationsModalIsOpen(false))
                    setSelectedStudentEducation(null)
                }}>
            Закрыть
        </button>
    </Modal>
}