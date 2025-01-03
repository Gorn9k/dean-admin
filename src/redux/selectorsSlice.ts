import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Option = {
    value: number,
    label: string
}

type SingleSelector = {
    selectedOption: Option | null
    optionsIsLoading: boolean
    options: Option[]
}

type MultiSelector = {
    selectedOptions: Option[] | null
    optionsIsLoading: boolean
    options: Option[]
}

type SelectorsState = {
    facultySelector: SingleSelector
    learnYearSelector: SingleSelector
    semesterSelector: SingleSelector
    studentSemesterMonthSelector: SingleSelector
    studentSemesterSelector: SingleSelector
    groupSemesterSelector: SingleSelector
    specializationSelector: SingleSelector
    paymentTypeSelector: SingleSelector
    citizenshipSelector: SingleSelector
    institutionSelector: SingleSelector
    languageSelector: SingleSelector
}

const initialState: SelectorsState = {
    facultySelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    learnYearSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: [
            {value: 2023, label: '2023'},
            {value: 2024, label: '2024'}
        ]
    },
    semesterSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: [
            {value: 1, label: 'Осенний'},
            {value: 2, label: 'Весенний'}
        ]
    },
    studentSemesterMonthSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    studentSemesterSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    groupSemesterSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    specializationSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    paymentTypeSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    citizenshipSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    institutionSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    },
    languageSelector: {
        selectedOption: null,
        optionsIsLoading: false,
        options: []
    }
}

const selectorsSlice = createSlice({
    name: "selectorsSlice",
    initialState,
    reducers: {
        setSelectedFaculty: (state, action: PayloadAction<Option | null>) => {
            state.facultySelector.selectedOption = action.payload;
        },
        setIsLoadingFaculties: (state, action: PayloadAction<boolean>) => {
            state.facultySelector.optionsIsLoading = action.payload
        },
        setFaculties: (state, action: PayloadAction<Option[]>) => {
            state.facultySelector.options = action.payload;
        },
        setSelectedLearnYear: (state, action: PayloadAction<Option | null>) => {
            state.learnYearSelector.selectedOption = action.payload;
        },
        setIsLoadingLearnYears: (state, action: PayloadAction<boolean>) => {
            state.learnYearSelector.optionsIsLoading = action.payload
        },
        setLearnYears: (state, action: PayloadAction<Option[]>) => {
            state.learnYearSelector.options = action.payload
        },
        setSelectedSemester: (state, action: PayloadAction<Option | null>) => {
            state.semesterSelector.selectedOption = action.payload;
        },
        setIsLoadingSemesters: (state, action: PayloadAction<boolean>) => {
            state.semesterSelector.optionsIsLoading = action.payload
        },
        setSemesters: (state, action: PayloadAction<Option[]>) => {
            state.semesterSelector.options = action.payload
        },
        setSelectedStudentSemester: (state, action: PayloadAction<Option | null>) => {
            state.studentSemesterSelector.selectedOption = action.payload;
        },
        setIsLoadingStudentSemesters: (state, action: PayloadAction<boolean>) => {
            state.studentSemesterSelector.optionsIsLoading = action.payload
        },
        setStudentSemesters: (state, action: PayloadAction<Option[]>) => {
            state.studentSemesterSelector.options = action.payload
        },
        setSelectedStudentSemesterMonth: (state, action: PayloadAction<Option | null>) => {
            state.studentSemesterMonthSelector.selectedOption = action.payload;
        },
        setIsLoadingStudentSemesterMonths: (state, action: PayloadAction<boolean>) => {
            state.studentSemesterMonthSelector.optionsIsLoading = action.payload
        },
        setStudentSemesterMonths: (state, action: PayloadAction<Option[]>) => {
            state.studentSemesterMonthSelector.options = action.payload
        },
        setSelectedGroupSemester: (state, action: PayloadAction<Option | null>) => {
            state.groupSemesterSelector.selectedOption = action.payload;
        },
        setIsLoadingGroupSemesters: (state, action: PayloadAction<boolean>) => {
            state.groupSemesterSelector.optionsIsLoading = action.payload
        },
        setGroupSemesters: (state, action: PayloadAction<Option[]>) => {
            state.groupSemesterSelector.options = action.payload
        },
        setSelectedSpecialization: (state, action: PayloadAction<Option | null>) => {
            state.specializationSelector.selectedOption = action.payload;
        },
        setIsLoadingSpecializations: (state, action: PayloadAction<boolean>) => {
            state.specializationSelector.optionsIsLoading = action.payload
        },
        setSpecializations: (state, action: PayloadAction<Option[]>) => {
            state.specializationSelector.options = action.payload
        },
        setSelectedPaymentType: (state, action: PayloadAction<Option | null>) => {
            state.paymentTypeSelector.selectedOption = action.payload;
        },
        setIsLoadingPaymentTypes: (state, action: PayloadAction<boolean>) => {
            state.paymentTypeSelector.optionsIsLoading = action.payload
        },
        setPaymentTypes: (state, action: PayloadAction<Option[]>) => {
            state.paymentTypeSelector.options = action.payload
        },
        setSelectedCitizenship: (state, action: PayloadAction<Option | null>) => {
            state.citizenshipSelector.selectedOption = action.payload;
        },
        setIsLoadingCitizenship: (state, action: PayloadAction<boolean>) => {
            state.citizenshipSelector.optionsIsLoading = action.payload
        },
        setCitizenship: (state, action: PayloadAction<Option[]>) => {
            state.citizenshipSelector.options = action.payload
        },
        setSelectedInstitution: (state, action: PayloadAction<Option | null>) => {
            state.institutionSelector.selectedOption = action.payload;
        },
        setIsLoadingInstitutions: (state, action: PayloadAction<boolean>) => {
            state.institutionSelector.optionsIsLoading = action.payload
        },
        setInstitutions: (state, action: PayloadAction<Option[]>) => {
            state.institutionSelector.options = action.payload
        },
        setSelectedLanguage: (state, action: PayloadAction<Option | null>) => {
            state.languageSelector.selectedOption = action.payload;
        },
        setIsLoadingLanguages: (state, action: PayloadAction<boolean>) => {
            state.languageSelector.optionsIsLoading = action.payload
        },
        setLanguages: (state, action: PayloadAction<Option[]>) => {
            state.languageSelector.options = action.payload
        },
        fetchSpecializationsByGroupId: (state, action: PayloadAction<number>) => {

        },
        fetchFaculties: (state, action: PayloadAction) => {

        },
        fetchGroupSemestersByGroupId: (state, action: PayloadAction<number>) => {

        },
        fetchStudentSemestersByCaseNo: (state, action: PayloadAction<string>) => {

        },
        fetchPaymentTypes: (state, action: PayloadAction) => {

        },
        fetchCitizenship: (state, action: PayloadAction) => {

        },
        fetchInstitutions: (state, action: PayloadAction) => {

        },
        fetchLanguages: (state, action: PayloadAction) => {

        }
    }
})

export const {
    setSelectedFaculty,
    setFaculties,
    setIsLoadingFaculties,
    setSelectedLearnYear,
    setIsLoadingGroupSemesters,
    setGroupSemesters,
    setSelectedSpecialization,
    setIsLoadingSpecializations,
    setIsLoadingStudentSemesterMonths,
    setSelectedGroupSemester,
    setSelectedStudentSemester,
    setSelectedStudentSemesterMonth,
    setIsLoadingStudentSemesters,
    setLearnYears,
    setStudentSemesterMonths,
    setSelectedSemester,
    setSemesters,
    setIsLoadingLearnYears,
    setStudentSemesters,
    setSpecializations,
    setIsLoadingSemesters,
    setIsLoadingInstitutions,
    setInstitutions,
    setIsLoadingLanguages,
    setSelectedPaymentType,
    setIsLoadingCitizenship,
    setIsLoadingPaymentTypes,
    setLanguages,
    setPaymentTypes,
    setSelectedCitizenship,
    setSelectedInstitution,
    setSelectedLanguage,
    setCitizenship,
    fetchGroupSemestersByGroupId,
    fetchFaculties,
    fetchInstitutions,
    fetchSpecializationsByGroupId,
    fetchStudentSemestersByCaseNo,
    fetchLanguages,
    fetchPaymentTypes,
    fetchCitizenship
} = selectorsSlice.actions

export default selectorsSlice.reducer