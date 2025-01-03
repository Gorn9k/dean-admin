import React, {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {StudentStatementType} from "../../../api/dean-api";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "../../modals/StudentInfoModalContainer/StudentInfoModalContainer.module.css";
import stylesFromApp from "../../../App.module.css";
import Select from "react-select";

export const StudentGradeFormContainer: FC<{
    selectedStatement: StudentStatementType | null
}> = ({selectedStatement}) => {

    const dispatch = useDispatch<AppDispatch>()

    const initialValues: StudentStatementType = useMemo(() => ({
        id: selectedStatement?.id,
        examType: selectedStatement?.examType,
        disciplineName: selectedStatement?.disciplineName,
        student: selectedStatement?.student,
        grade: selectedStatement?.grade,
        hours: selectedStatement?.hours,
        testPoints: selectedStatement?.testPoints,
        teachers: selectedStatement?.teachers,
        dateOfExam: selectedStatement?.dateOfExam,
        isRetake: selectedStatement?.isRetake
    }), [selectedStatement])

    const validationSchema = useMemo(() => (Yup.object({
        examType: Yup.string().required("Обязательное поле"),
        disciplineName: Yup.string().required("Обязательное поле"),
        student: Yup.string().required("Обязательное поле"),
        grade: Yup.string().required("Обязательное поле"),
        hours: Yup.string().required("Обязательное поле"),
        testPoints: Yup.string().required("Обязательное поле"),
        teachers: Yup.array().required("Обязательное поле"),
        dateOfExam: Yup.string().required("Обязательное поле"),
        isRetake: Yup.boolean().required("Обязательное поле")
    })), [])

    const handleSubmit = useCallback((values: StudentStatementType) => {
        // dispatch((selectedStudentParent ? updateStudentParents : addStudentParent)(values))
        // dispatch(setStudentParentModalIsOpen(false))
    }, [dispatch, selectedStatement])

    return <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {
            (({errors, touched, values}) => {
                return <Form className={styles.form2}>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'examType'}>{'Тип экзамена'}:</label>
                        <Field autoComplete={'on'}
                               name={'examType'}
                               type={'text'}
                               id={'examType'}
                               className={errors.examType && touched.examType ? styles.error : undefined}
                        />
                        <ErrorMessage name={'examType'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'disciplineName'}>{'Название дисциплины'}:</label>
                        <Field autoComplete={'on'}
                               name={'disciplineName'}
                               type={'text'}
                               id={'disciplineName'}
                               className={errors.disciplineName && touched.disciplineName ? styles.error : undefined}
                        />
                        <ErrorMessage name={'disciplineName'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'student'}>{'Студент'}:</label>
                        <Field autoComplete={'on'}
                               name={'student'}
                               type={'text'}
                               id={'student'}
                               className={errors.student && touched.student ? styles.error : undefined}
                        />
                        <ErrorMessage name={'student'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'grade'}>{'Оценка'}:</label>
                        <Field autoComplete={'on'}
                               name={'grade'}
                               type={'text'}
                               id={'grade'}
                               className={errors.grade && touched.grade ? styles.error : undefined}
                        />
                        <ErrorMessage name={'grade'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'hours'}>{'Часы'}:</label>
                        <Field autoComplete={'on'}
                               name={'hours'}
                               type={'text'}
                               id={'hours'}
                               className={errors.hours && touched.hours ? styles.error : undefined}
                        />
                        <ErrorMessage name={'hours'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'testPoints'}>{'Зачётные единицы'}:</label>
                        <Field autoComplete={'on'}
                               name={'testPoints'}
                               type={'text'}
                               id={'testPoints'}
                               className={errors.testPoints && touched.testPoints ? styles.error : undefined}
                        />
                        <ErrorMessage name={'testPoints'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'teachers'}>{'Преподаватели'}:</label>
                        <Field name={'teachers'}
                               inputId={'teachers'}
                               as={Select}
                               isMulti={true}
                               isDisabled
                               value={values?.teachers?.map(value => ({value: value, label: value}))}
                               placeholder={''}
                               className={errors.teachers && touched.teachers ? styles.error : undefined}
                        />
                        <ErrorMessage name={'teachers'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label htmlFor={'dateOfExam'}>{'Дата сдачи'}:</label>
                        <Field autoComplete={'on'}
                               name={'dateOfExam'}
                               type={'date'}
                               id={'dateOfExam'}
                               className={errors.dateOfExam && touched.dateOfExam ? styles.error : undefined}
                        />
                        <ErrorMessage name={'dateOfExam'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <div className={`${styles.formColumn}`}>
                        <label>
                            <Field
                                name={'isRetake'}
                                type={'checkbox'}
                                className={errors.isRetake && touched.isRetake ? styles.error : undefined}
                            />
                            {`${values.isRetake ? 'Пересдача' : 'Не пересдача'}`}:
                        </label>
                        <ErrorMessage name={'isRetake'} component="div"
                                      className={styles.errorMessage}/>
                    </div>
                    <button type="submit"
                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                        {selectedStatement ? 'Сохранить изменения' : 'Добавить'}
                    </button>
                </Form>
            })
        }
    </Formik>
}