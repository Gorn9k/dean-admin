import React, {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {EducationType, StudentType} from "../../../api/dean-api";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import styles from "../../modals/StudentInfoModalContainer/StudentInfoModalContainer.module.css";
import stylesFromApp from "../../../App.module.css";
import {setStudentEducationsModalIsOpen} from "../../../redux/modalsSlice";

export const StudentEducationFormContainer: FC<{
    selectedStudentEducation: EducationType | null
    educations: EducationType[]
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<StudentType>>
}> = ({selectedStudentEducation, educations, setFieldValue}) => {

    const dispatch = useDispatch<AppDispatch>()

    const initialValues: EducationType = useMemo(() => ({
        id: selectedStudentEducation?.id,
        education: selectedStudentEducation?.education || '',
        educationDocumentType: selectedStudentEducation?.educationDocumentType || '',
        educationDocumentNumber: selectedStudentEducation?.educationDocumentNumber || '',
        educationDocumentSerial: selectedStudentEducation?.educationDocumentSerial || '',
    }), [selectedStudentEducation])

    const validationSchema = useMemo(() => (Yup.object({
        education: Yup.string().required("Обязательное поле"),
        educationDocumentType: Yup.string().required("Обязательное поле"),
        educationDocumentNumber: Yup.string().required("Обязательное поле"),
        educationDocumentSerial: Yup.string().required("Обязательное поле")
    })), [])

    const handleSubmit = useCallback((values: EducationType) => {
        const newEducations = selectedStudentEducation ? educations.filter(value =>
            value.id !== selectedStudentEducation?.id) : [...educations]
        newEducations.push(values)
        setFieldValue('educations', newEducations)
            .then(() => dispatch(setStudentEducationsModalIsOpen(false)))
    }, [dispatch, educations, selectedStudentEducation, setFieldValue])

    return <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {
            (({errors, touched}) => {
                return <Form className={styles.form2}>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'education'}>{'Образование'}:</label>
                        <Field autoComplete={'on'}
                               name={'education'}
                               type={'text'}
                               id={'education'}
                               className={errors.education && touched.education ? styles.error : undefined}
                        />
                        <ErrorMessage name={'education'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'educationDocumentType'}>{'Тип образования'}:</label>
                        <Field autoComplete={'on'}
                               name={'educationDocumentType'}
                               type={'text'}
                               id={'educationDocumentType'}
                               className={errors.educationDocumentType && touched.educationDocumentType ? styles.error : undefined}
                        />
                        <ErrorMessage name={'educationDocumentType'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'educationDocumentNumber'}>{'Номер образования'}:</label>
                        <Field autoComplete={'on'}
                               name={'educationDocumentNumber'}
                               type={'text'}
                               id={'educationDocumentNumber'}
                               className={errors.educationDocumentNumber && touched.educationDocumentNumber ? styles.error : undefined}
                        />
                        <ErrorMessage name={'educationDocumentNumber'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'educationDocumentSerial'}>{'Серийное образование'}:</label>
                        <Field autoComplete={'on'}
                               name={'educationDocumentSerial'}
                               type={'text'}
                               id={'educationDocumentSerial'}
                               className={errors.educationDocumentSerial && touched.educationDocumentSerial ? styles.error : undefined}
                        />
                        <ErrorMessage name={'educationDocumentSerial'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <button type="submit"
                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                        {selectedStudentEducation ? 'Сохранить изменения' : 'Добавить'}
                    </button>
                </Form>
            })
        }
    </Formik>
}