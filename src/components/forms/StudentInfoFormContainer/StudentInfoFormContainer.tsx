import {Formik} from "formik";
import React, {FC, useCallback, useEffect, useMemo} from "react";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {StudentType} from "../../../api/dean-api";
import {FormikFormContainer} from "./FormikFormContainer/FormikFormContainer";
import stylesFromApp from "../../../App.module.css";
import {
    setStudentAbsencesModalIsOpen,
    setStudentModalIsOpen,
    setStudentStatementsModalIsOpen
} from "../../../redux/modalsSlice";
import {setSelectedStudent, updateSelectedStudent} from "../../../redux/tablesSlice";
import {
    fetchCitizenship,
    fetchInstitutions,
    fetchLanguages,
    fetchPaymentTypes,
    fetchSpecializationsByGroupId
} from "../../../redux/selectorsSlice";
import {setIsOnEditMode} from "../../../redux/studentSlice";

export const StudentInfoFormContainer: FC = () => {

    const selectedStudent = useSelector((state: RootState) => state.tables.studentsTable.selectedStudent)
    const groupName = useSelector((state: RootState) => state.tables.groupsTable.selectedGroup?.name)
    const groupId = useSelector((state: RootState) => state.tables.groupsTable.selectedGroup?.id)
    const studentGroupId = useSelector((state: RootState) => state.tables.studentsTable.selectedStudent?.group?.id)

    const isOnEditMode = useSelector((state: RootState) => state.student.isOnEditMode)

    const dispatch = useDispatch<AppDispatch>()

    const initialValues: StudentType = useMemo(() => ({
        id: selectedStudent?.id,
        surname: selectedStudent?.surname || '',
        name: selectedStudent?.name || '',
        patronymic: selectedStudent?.patronymic || '',
        paymentType: selectedStudent?.paymentType || '',
        email: selectedStudent?.email || '',
        caseNo: selectedStudent?.caseNo || 0,
        phone: selectedStudent?.phone || '',
        group: {id: selectedStudent?.group?.id, name: selectedStudent?.group?.name || groupName || ''},
        specialization: (selectedStudent?.specialization?.id && selectedStudent?.specialization?.name &&
            {id: selectedStudent?.specialization?.id, name: selectedStudent?.specialization?.name || ''}) || null,
        birthDate: selectedStudent?.birthDate || '',
        birthPlace: selectedStudent?.birthPlace || '',
        sex: (selectedStudent?.sex && ['м', 'ж'].includes(selectedStudent.sex) && selectedStudent.sex) || '',
        citizenship: (selectedStudent?.citizenship?.id && selectedStudent?.citizenship?.name &&
            {id: selectedStudent?.citizenship?.id, name: selectedStudent?.citizenship?.name || ''}) || null,
        language: (selectedStudent?.language?.id && selectedStudent?.language?.name &&
            {id: selectedStudent?.language?.id, name: selectedStudent?.language?.name || ''}) || null,
        institution: (selectedStudent?.institution?.id && selectedStudent?.institution?.fullName &&
            {id: selectedStudent?.institution?.id, fullName: selectedStudent?.institution?.fullName || ''}) || null,
        educationYearEnd: selectedStudent?.educationYearEnd || 0,
        addressIndex: selectedStudent?.addressIndex || '',
        addressCountry: selectedStudent?.addressCountry || '',
        addressState: selectedStudent?.addressState || '',
        addressRegion: selectedStudent?.addressRegion || '',
        addressCity: selectedStudent?.addressCity || '',
        addressStreet: selectedStudent?.addressStreet || '',
        addressHouse: selectedStudent?.addressHouse || '',
        addressHousePart: selectedStudent?.addressHousePart || '',
        addressFlat: selectedStudent?.addressFlat || '',
        job: selectedStudent?.job || 'нет',
        jobExperience: selectedStudent?.jobExperience || '0.0',
        photoUrl: selectedStudent?.photoUrl || `${process.env.PUBLIC_URL}/none.jpg`,
        parents: selectedStudent?.parents || [],
        educations: selectedStudent?.educations || [],
        status: selectedStudent?.status || 'DELETED'
    }), [selectedStudent, groupName])

    const validationSchema = useMemo(() => (Yup.object({
        surname: Yup.string().required("Обязательное поле"),
        name: Yup.string().required("Обязательное поле"),
        patronymic: Yup.string().required("Обязательное поле"),
        email: Yup.string().required("Обязательное поле"),
        paymentType: Yup.string().required("Обязательное поле"),
        caseNo: Yup.string().required("Обязательное поле"),
        phone: Yup.string().required("Обязательное поле"),
        group: Yup.object({name: Yup.string().required("Обязательное поле")}),
        specialization: Yup.object().required('Обязательное поле'),
        birthDate: Yup.string().required("Обязательное поле"),
        birthPlace: Yup.string().required("Обязательное поле"),
        sex: Yup.string().required("Обязательное поле"),
        citizenship: Yup.object().required('Обязательное поле'),
        language: Yup.object().required('Обязательное поле'),
        institution: Yup.object().required('Обязательное поле'),
        educationYearEnd: Yup.string().required("Обязательное поле"),
        addressIndex: Yup.string().required("Обязательное поле"),
        addressCountry: Yup.string().required("Обязательное поле"),
        addressState: Yup.string().required("Обязательное поле"),
        addressRegion: Yup.string().required("Обязательное поле"),
        addressCity: Yup.string().required("Обязательное поле"),
        addressStreet: Yup.string().required("Обязательное поле"),
        addressHouse: Yup.string().required("Обязательное поле"),
        addressHousePart: Yup.string().required("Обязательное поле"),
        addressFlat: Yup.string().required("Обязательное поле"),
        job: Yup.string().required("Обязательное поле"),
        jobExperience: Yup.string().required("Обязательное поле")
    })), [])

    const handleSubmit = useCallback((values: StudentType) => {
        console.log("Отправка формы:", values);
        dispatch(updateSelectedStudent(values))
    }, [dispatch])

    useEffect(() => {
        (groupId || studentGroupId) && dispatch(fetchSpecializationsByGroupId(groupId ?? studentGroupId ?? 0))
        dispatch(fetchPaymentTypes())
        dispatch(fetchCitizenship())
        dispatch(fetchInstitutions())
        dispatch(fetchLanguages())
    }, [dispatch, groupId, studentGroupId]);

    return <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {
            (({errors, touched, resetForm, values, setFieldValue, setFieldTouched}) => {
                return <FormikFormContainer errors={errors}
                                            touched={touched}
                                            isOnEditMode={isOnEditMode}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            resetForm={resetForm}
                                            setFieldTouched={setFieldTouched}>
                    <div className={`${stylesFromApp.buttonsContainer}`}>
                        {
                            isOnEditMode ?
                                <>
                                    <button type="submit" form={'2'}
                                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                                        Сохранить изменения
                                    </button>
                                    <button type="button"
                                            onClick={() => {
                                                dispatch(setIsOnEditMode(false))
                                                resetForm()
                                            }}
                                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                                        Отмена
                                    </button>
                                </>
                                :
                                <>
                                    <input type={'button'} value={'Редактировать'}
                                           onClick={() => dispatch(setIsOnEditMode(true))}
                                           className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}/>
                                    <button type="button"
                                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}
                                            onClick={() => {
                                                dispatch(setStudentStatementsModalIsOpen(true))
                                            }}>
                                        Показать оценки
                                    </button>
                                    <button type="button"
                                            className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}
                                            onClick={() => {
                                                dispatch(setStudentAbsencesModalIsOpen(true))
                                            }}>
                                        Показать пропуски
                                    </button>
                                </>
                        }
                        <button type="button"
                                className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}
                                onClick={() => {
                                    dispatch(setStudentModalIsOpen(false))
                                    dispatch(setSelectedStudent(null))
                                    dispatch(setIsOnEditMode(false))
                                }}>
                            Закрыть
                        </button>
                    </div>
                </FormikFormContainer>
            })
        }
    </Formik>
}