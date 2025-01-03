import React, {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {ParentType, StudentType} from "../../../api/dean-api";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import styles from "../../modals/StudentInfoModalContainer/StudentInfoModalContainer.module.css";
import stylesFromApp from "../../../App.module.css";
import {setStudentParentsModalIsOpen} from "../../../redux/modalsSlice";

export const StudentParentFormContainer: FC<{
    selectedStudentParent: ParentType | null, 
    parents: ParentType[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<StudentType>>
}> = ({selectedStudentParent, parents, setFieldValue}) => {

    const dispatch = useDispatch<AppDispatch>()

    const initialValues: ParentType = useMemo(() => ({
        id: selectedStudentParent?.id,
        surname: selectedStudentParent?.surname || '',
        name: selectedStudentParent?.name || '',
        patronymic: selectedStudentParent?.patronymic || '',
        phone: selectedStudentParent?.phone || '',
        job: selectedStudentParent?.job || 'нет'
    }), [selectedStudentParent])

    const validationSchema = useMemo(() => (Yup.object({
        surname: Yup.string().required("Обязательное поле"),
        name: Yup.string().required("Обязательное поле"),
        patronymic: Yup.string().required("Обязательное поле"),
        phone: Yup.string().required("Обязательное поле"),
        job: Yup.string().required("Обязательное поле")
    })), [])

    const handleSubmit = useCallback((values: ParentType) => {
        const newParents = selectedStudentParent ? parents.filter(value =>
                value.id !== selectedStudentParent?.id) : [...parents]
        newParents.push(values)
        setFieldValue('parents', newParents)
            .then(() => dispatch(setStudentParentsModalIsOpen(false)))
    }, [dispatch, parents, selectedStudentParent, setFieldValue])

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
                        <label htmlFor={'surname'}>{'Фамилия'}:</label>
                        <Field autoComplete={'on'}
                               name={'surname'}
                               type={'text'}
                               id={'surname'}
                               className={errors.surname && touched.surname ? styles.error : undefined}
                        />
                        <ErrorMessage name={'surname'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'name'}>{'Имя'}:</label>
                        <Field autoComplete={'on'}
                               name={'name'}
                               type={'text'}
                               id={'name'}
                               className={errors.name && touched.name ? styles.error : undefined}
                        />
                        <ErrorMessage name={'name'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'patronymic'}>{'Отчество'}:</label>
                        <Field autoComplete={'on'}
                               name={'patronymic'}
                               type={'text'}
                               id={'patronymic'}
                               className={errors.patronymic && touched.patronymic ? styles.error : undefined}
                        />
                        <ErrorMessage name={'patronymic'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'phone'}>{'Телефон'}:</label>
                        <Field autoComplete={'on'}
                               name={'phone'}
                               type={'text'}
                               id={'phone'}
                               className={errors.phone && touched.phone ? styles.error : undefined}
                        />
                        <ErrorMessage name={'phone'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'job'}>{'Работа'}:</label>
                        <Field autoComplete={'on'}
                               name={'job'}
                               type={'text'}
                               id={'job'}
                               className={errors.job && touched.job ? styles.error : undefined}
                        />
                        <ErrorMessage name={'job'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <button type="submit"
                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                        {selectedStudentParent ? 'Сохранить изменения' : 'Добавить'}
                    </button>
                </Form>
            })
        }
    </Formik>
}