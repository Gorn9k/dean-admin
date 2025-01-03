import {ErrorMessage, Field, Form, FormikErrors, FormikState, FormikTouched, FormikValues, getIn} from "formik";
import {EducationType, ParentType, StudentType} from "../../../../api/dean-api";
import React, {FC, ReactNode, useEffect, useMemo, useState} from "react";
import styles from '../../../modals/StudentInfoModalContainer/StudentInfoModalContainer.module.css'
import {Image} from "../../../Image/Image";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import stylesFromApp from "../../../../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import Select from "react-select";
import {Option} from "../../../../redux/selectorsSlice";
import {setStudentEducationsModalIsOpen, setStudentParentsModalIsOpen} from "../../../../redux/modalsSlice";
import {
    StudentEducationModalContainer
} from "../../../modals/StudentEducationModalContainer/StudentEducationModalContainer";
import {StudentParentModalContainer} from "../../../modals/StudentParentModalContainer/StudentParentModalContainer";

type FormikFormType = {
    errors: FormikErrors<StudentType>
    touched: FormikTouched<StudentType>
    isOnEditMode: boolean
    children: ReactNode
    values: StudentType
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<StudentType>>
    resetForm: (nextState?: Partial<FormikState<FormikValues>>) => void
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>
}

export const FormikFormContainer: FC<FormikFormType> = ({
                                                            errors,
                                                            touched,
                                                            isOnEditMode,
                                                            children,
                                                            values,
                                                            setFieldValue,
                                                            resetForm,
                                                            setFieldTouched
                                                        }) => {

    const paymentTypes = useSelector((state: RootState) => state.selectors.paymentTypeSelector.options)
    const sex = useMemo<Option[]>(() => [
        {value: 0, label: 'м'},
        {value: 1, label: 'ж'}
    ], [])
    const citizenship = useSelector((state: RootState) => state.selectors.citizenshipSelector.options)
    const institutions = useSelector((state: RootState) => state.selectors.institutionSelector.options)
    const languages = useSelector((state: RootState) => state.selectors.languageSelector.options)
    const specializations = useSelector((state: RootState) => state.selectors.specializationSelector.options)
    const isEditingStudentInProcess = useSelector((state: RootState) => state.student.isEditingStudentInProcess)

    const [selectedStudentParent, setSelectedStudentParent] = useState<ParentType | null>(null)
    const [selectedStudentEducation, setSelectedStudentEducation] = useState<EducationType | null>(null)

    const dispatch = useDispatch<AppDispatch>()

    const formBlocks = [1, 2]

    const formHeaders = [
        {id: 1, header: 'Группа', blockId: 1},
        {id: 2, header: '№ зачётки и ФИО', blockId: 1},
        {id: 3, header: 'Где и когда родился', blockId: 2, parentGridId: 'place'},
        {id: 4, header: 'Что окончил', blockId: 2, parentGridId: 'study'},
        {id: 6, header: 'Место работы', blockId: 2, parentGridId: 'work'},
        {id: 5, header: 'Адрес', blockId: 2, parentGridId: 'address'}
    ]

    const formFields = [
        {
            name: 'group.name',
            type: 'text',
            label: 'Название группы',
            disabled: true,
            headerId: 1,
            template: '1 / 1 / 2 / 2',
        },
        {
            name: 'specialization',
            selectValue: 'specialization.id',
            selectLabel: 'specialization.name',
            label: 'Название специализации',
            headerId: 1,
            template: '1 / 2 / 2 / 3',
            select: {
                options: specializations,
                width: 347
            }
        },
        {
            name: 'paymentType',
            selectValue: 'paymentType',
            selectLabel: 'paymentType',
            label: 'Оплата обучения',
            headerId: 1,
            template: '1 / 3 / 2 / 4',
            select: {
                options: paymentTypes,
                width: 347
            }
        },
        {name: 'surname', type: 'text', label: 'Фамилия', headerId: 2, template: '1 / 1 / 2 / 2'},
        {name: 'name', type: 'text', label: 'Имя', headerId: 2, template: '1 / 2 / 2 / 3'},
        {name: 'patronymic', type: 'text', label: 'Отчество', headerId: 2, template: '1 / 3 / 2 / 4'},
        {name: 'caseNo', type: 'text', label: 'Номер зачётки', disabled: true, headerId: 2, template: '2 / 1 / 3 / 2'},
        {name: 'phone', type: 'text', label: 'Номер телефона', headerId: 2, template: '2 / 2 / 3 / 3'},
        {
            name: 'email',
            type: 'text',
            label: 'Адрес электронной почты',
            headerId: 2,
            template: '2 / 3 / 3 / 4',
        },
        {name: 'birthDate', type: 'date', label: 'День рождения', headerId: 3, template: '1 / 1 / 2 / 2'},
        {
            name: 'birthPlace',
            type: 'text',
            label: 'Место рождения',
            headerId: 3,
            template: '1 / 2 / 2 / 3'
        },
        {
            name: 'sex',
            selectValue: 'sex',
            selectLabel: 'sex',
            label: 'Пол',
            headerId: 3,
            template: '1 / 3 / 2 / 4',
            select: {
                options: sex,
                width: 241
            }
        },
        {
            name: 'language',
            selectValue: 'language.id',
            selectLabel: 'language.name',
            label: 'Иностранный язык',
            headerId: 3,
            template: '2 / 1 / 3 / 2',
            select: {
                options: languages,
                width: 241
            }
        },
        {
            name: 'citizenship',
            selectValue: 'citizenship.id',
            selectLabel: 'citizenship.name',
            label: 'Гражданство',
            headerId: 3,
            template: '2 / 2 / 3 / 4',
            select: {
                options: citizenship,
                width: 522
            }
        },
        {
            name: 'institution',
            selectValue: 'institution.id',
            selectLabel: 'institution.fullName',
            label: 'Учился',
            headerId: 4,
            template: '1 / 1 / 2 / 2',
            select: {
                options: institutions,
                width: 289
            }
        },
        {
            name: 'educationYearEnd',
            type: 'text',
            label: 'Закончил учёбу',
            headerId: 4,
            template: '2 / 1 / 3 / 2'
        },
        {name: 'job', type: 'text', label: 'Место работы', headerId: 6, template: '1 / 1 / 2 / 2'},
        {
            name: 'jobExperience',
            type: 'text',
            label: 'Стаж работы',
            headerId: 6,
            template: '2 / 1 / 3 / 2'
        },
        {
            name: 'addressIndex',
            type: 'text',
            label: 'Почтовый индекс',
            headerId: 5,
            template: '1 / 1 / 2 / 2'
        },
        {name: 'addressCountry', type: 'text', label: 'Страна', headerId: 5, template: '1 / 2 / 2 / 3'},
        {name: 'addressState', type: 'text', label: 'Область', headerId: 5, template: '1 / 3 / 2 / 4'},
        {name: 'addressRegion', type: 'text', label: 'Регион', headerId: 5, template: '2 / 1 / 3 / 2'},
        {name: 'addressCity', type: 'text', label: 'Город', headerId: 5, template: '2 / 2 / 3 / 3'},
        {name: 'addressStreet', type: 'text', label: 'Улица', headerId: 5, template: '2 / 3 / 3 / 4'},
        {name: 'addressHouse', type: 'text', label: 'Дом', headerId: 5, template: '3 / 1 / 4 / 2'},
        {name: 'addressHousePart', type: 'text', label: 'Корпус', headerId: 5, template: '3 / 2 / 4 / 3'},
        {name: 'addressFlat', type: 'text', label: 'Квартира', headerId: 5, template: ' 3 / 3 / 4 / 4'}
    ]

    const colDefsEducation = useMemo<ColDef<EducationType>[]>(() => [
        {field: 'education', headerName: 'Учреждение образования'},
        {field: 'educationDocumentType', headerName: 'Тип документа'},
        {field: 'educationDocumentSerial', headerName: 'Серия документа'},
        {field: 'educationDocumentNumber', headerName: 'Номер документа'},
    ], [])

    const colDefsParent = useMemo<ColDef<ParentType>[]>(() => [
        {valueGetter: ({data}) => `${data?.surname} ${data?.name} ${data?.patronymic}`, headerName: 'Ф.И.О'},
        {field: 'phone', headerName: 'Номер телефона'},
        {field: 'job', headerName: 'Место работы'},
    ], [])

    useEffect(() => {
        !(isEditingStudentInProcess ?? true) && resetForm()
    }, [isEditingStudentInProcess, resetForm]);

    return <>
        <StudentEducationModalContainer selectedStudentEducation={selectedStudentEducation}
                                        setSelectedStudentEducation={setSelectedStudentEducation}
                                        setFieldValue={setFieldValue}
                                        educations={values.educations || []}/>
        <StudentParentModalContainer selectedStudentParent={selectedStudentParent}
                                     setSelectedStudentParent={setSelectedStudentParent}
                                     parents={values.parents || []}
                                     setFieldValue={setFieldValue}/>
        <Form id={'2'} className={styles.form}>
            <Image url={values.photoUrl}>
                {isOnEditMode &&
                    <>
                        <label htmlFor="file-upload"
                               className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                            {'Загрузить фото'}
                        </label>
                        <input id="file-upload"
                               type="file"
                               onChange={(event) => {
                                   if ((event.target.files?.item(0) as File).type === 'image/jpeg') {
                                       setFieldValue('photoUrl', URL.createObjectURL((event.target.files?.item(0) as File)))
                                   }
                               }}
                               style={{display: 'none'}}/>
                    </>
                }
            </Image>
            {
                formBlocks.map(valueBlock => {
                    return <div key={valueBlock}
                                className={`${valueBlock === 1 ? `${styles.mainInfo}` : `${styles.footer}`}`}>
                        {
                            formHeaders.map(value => {
                                if (value.blockId !== valueBlock)
                                    return undefined
                                return <div key={`${value.id}`}
                                            className={`${styles.leftSideContainer} ${value.parentGridId ? styles[value.parentGridId] : ''}`}>
                                    <h2>{value.header}</h2>
                                    <div className={`${styles.formRow}`}>
                                        {
                                            formFields.map((field) => field.headerId === value.id && (
                                                <div key={field.name} className={`${styles.formColumn}`}
                                                     style={{gridArea: field.template}}>
                                                    <label htmlFor={field.name}>{field.label}:</label>
                                                    {
                                                        field.select && isOnEditMode ? <Field
                                                                placeholder={''}
                                                                name={field.selectLabel}
                                                                as={Select}
                                                                options={field.select.options}
                                                                value={(getIn(values, field.name)
                                                                    && getIn(values, field.selectLabel)
                                                                    && getIn(values, field.selectValue)
                                                                    && {
                                                                        value: getIn(values, field.selectValue),
                                                                        label: getIn(values, field.selectLabel)
                                                                    }) || ''}
                                                                onChange={(e: any) => {
                                                                    setFieldValue(field.name, e !== null ? ((['sex', 'paymentType']
                                                                        .includes(field.name) ? e?.label : field.name !== 'institution' ? {
                                                                        id: e?.value,
                                                                        name: e?.label
                                                                    } : {id: e?.value, fullName: e?.label})) : null)
                                                                }}
                                                                isClearable
                                                                styles={{
                                                                    control: (base: any) => ({
                                                                        ...base,
                                                                        height: '40px',
                                                                        border: getIn(errors, field.name) && getIn(touched, field.name) && isOnEditMode ? undefined : '1px solid #ebebeb',
                                                                        boxShadow: '2px 8px 15px rgba(201, 201, 201, 0.1)',
                                                                        borderRadius: '10px',
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        alignContent: 'center',
                                                                        flexWrap: 'nowrap',
                                                                        borderColor: getIn(errors, field.name) && getIn(touched, field.name) && isOnEditMode ? 'red' : undefined
                                                                    }),
                                                                    container: (base: any) => ({
                                                                        ...base,
                                                                        minWidth: field.select.width
                                                                    })
                                                                }}
                                                                inputId={field.name}
                                                            /> :
                                                            <Field autoComplete={'on'}
                                                                   disabled={!isOnEditMode || field.disabled}
                                                                   name={field.selectLabel ?? field.name}
                                                                   type={field.type}
                                                                   id={field.name}
                                                                   className={(!(values.status === 'DELETED' && field.name === 'caseNo') &&
                                                                           !(getIn(errors, field.name) && getIn(touched, field.name) && isOnEditMode) && undefined)
                                                                       || ((values.status === 'DELETED' && field.name === 'caseNo') &&
                                                                           (getIn(errors, field.name) && getIn(touched, field.name) && isOnEditMode) && `${stylesFromApp.lineThrough} ${styles.error}`)
                                                                       || ((values.status === 'DELETED' && field.name === 'caseNo') && stylesFromApp.lineThrough)
                                                                       || (getIn(errors, field.name) && getIn(touched, field.name) && isOnEditMode && styles.error)}
                                                            />
                                                    }
                                                    {
                                                        isOnEditMode && <ErrorMessage name={field.name} component="div"
                                                                                      className={styles.errorMessage}/>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            })
                        }
                        {valueBlock !== 1 &&
                            <>
                                <div style={{gridArea: '3 / 1 / 4 / 4', display: 'flex', flexDirection: 'column'}}>
                                    <h2 style={{textAlign: 'center'}}>Представители</h2>
                                    {
                                        isOnEditMode && <button type="button"
                                                                onClick={() => dispatch(setStudentParentsModalIsOpen(true))}
                                                                style={{alignSelf: 'center', margin: '0 0 10px 0'}}
                                                                className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                                            Добавить
                                        </button>
                                    }
                                    <div className="ag-theme-quartz"
                                         style={{
                                             height: "140px",
                                             width: "auto"
                                         }}>
                                        <AgGridReact
                                            rowData={values.parents || []}
                                            noRowsOverlayComponent={() => 'Нет данных'}
                                            columnDefs={colDefsParent}
                                            defaultColDef={{
                                                flex: 1
                                            }}
                                            animateRows={true}
                                            onCellDoubleClicked={(event) => isOnEditMode &&
                                                dispatch(setStudentParentsModalIsOpen(true))
                                                && setSelectedStudentParent(event.data ?? null)
                                            }
                                        />
                                    </div>
                                </div>
                                <div style={{gridArea: '4 / 1 / 5 / 4', display: 'flex', flexDirection: 'column'}}>
                                    <h2 style={{textAlign: 'center'}}>Иное образование</h2>
                                    {
                                        isOnEditMode && <button type="button"
                                                                onClick={() => dispatch(setStudentEducationsModalIsOpen(true))}
                                                                style={{alignSelf: 'center', margin: '0 0 10px 0'}}
                                                                className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                                            Добавить
                                        </button>
                                    }
                                    <div className="ag-theme-quartz"
                                         style={{
                                             height: "100px",
                                             width: "auto"
                                         }}>
                                        <AgGridReact
                                            rowData={values.educations || []}
                                            columnDefs={colDefsEducation}
                                            noRowsOverlayComponent={() => 'Нет данных'}
                                            defaultColDef={{
                                                flex: 1
                                            }}
                                            animateRows={true}
                                            onCellDoubleClicked={(event) => isOnEditMode &&
                                                dispatch(setStudentEducationsModalIsOpen(true))
                                                && setSelectedStudentEducation(event.data ?? null)
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                })
            }
        </Form>
        {children}
    </>
}