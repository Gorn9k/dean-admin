import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type ModelsState = {
    studentsModalIsOpen: boolean
    studentModalIsOpen: boolean
    studentStatementsModalIsOpen: boolean
    studentStatementModalIsOpen: boolean
    studentAbsencesModalIsOpen: boolean
    groupStatementsModalIsOpen: boolean
    groupStatementsDisciplineModalIsOpen: boolean
    studentParentsModalIsOpen: boolean
    studentEducationsModalIsOpen: boolean
}

const initialState: ModelsState = {
    studentsModalIsOpen: false,
    studentModalIsOpen: false,
    studentStatementsModalIsOpen: false,
    studentStatementModalIsOpen: false,
    studentAbsencesModalIsOpen: false,
    groupStatementsModalIsOpen: false,
    groupStatementsDisciplineModalIsOpen: false,
    studentParentsModalIsOpen: false,
    studentEducationsModalIsOpen: false
}

const modalsSlice = createSlice({
    name: "modelsPageSlice",
    initialState,
    reducers: {
        setStudentsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentsModalIsOpen = action.payload
        },
        setStudentModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentModalIsOpen = action.payload
        },
        setStudentStatementModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentStatementModalIsOpen = action.payload
        },
        setStudentStatementsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentStatementsModalIsOpen = action.payload
        },
        setStudentAbsencesModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentAbsencesModalIsOpen = action.payload
        },
        setGroupStatementsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.groupStatementsModalIsOpen = action.payload
        },
        setStudentParentsModalIsOpen: (state, action: PayloadAction<boolean>) => {
          state.studentParentsModalIsOpen = action.payload
        },
        setGroupStatementsDisciplineModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.groupStatementsDisciplineModalIsOpen = action.payload
        },
        setStudentEducationsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.studentEducationsModalIsOpen = action.payload
        },
        fetchHasAuthority: (state, action: PayloadAction) => {

        }
    }
})

export const {
    setStudentsModalIsOpen,
    setStudentModalIsOpen,
    setStudentAbsencesModalIsOpen,
    setStudentStatementsModalIsOpen,
    setGroupStatementsModalIsOpen,
    setGroupStatementsDisciplineModalIsOpen,
    setStudentParentsModalIsOpen,
    setStudentEducationsModalIsOpen,
    fetchHasAuthority,
    setStudentStatementModalIsOpen
} = modalsSlice.actions

export default modalsSlice.reducer