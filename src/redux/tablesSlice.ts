import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    StudentAbsencesContentType,
    StudentStatementsContentType,
    GroupStatementType,
    GroupType,
    StudentStatementType,
    StudentType
} from "../api/dean-api";

type TablesState = {
    groupsTable: {
        isLoadingGroups: boolean
        selectedGroup: GroupType | null
        groups: GroupType[]
    }
    studentsTable: {
        watchDeletedStudents: boolean
        isLoadingStudents: boolean
        selectedStudent: StudentType | null
        students: StudentType[]
    }
    groupStatementsTable: {
        isLoadingStatements: boolean
        selectedStatement: GroupStatementType | null
        statements: GroupStatementType[]
    }
    studentStatementsTable: {
        selectPractices: boolean
        isLoadingStatements: boolean
        selectedStatement: StudentStatementType | null
        statementsContent: StudentStatementsContentType
    }
    groupStatementsDisciplineTable: {
        isLoadingStatements: boolean
        selectedStatement: StudentStatementType | null
        statementsContent: StudentStatementsContentType
    }
    studentAbsencesTable: {
        onlyPaidAbsences: boolean
        isLoadingAbsences: boolean
        absencesContent: StudentAbsencesContentType
    }
}

const initialState: TablesState = {
    groupsTable: {
        isLoadingGroups: false,
        selectedGroup: null,
        groups: []
    },
    studentsTable: {
        watchDeletedStudents: false,
        isLoadingStudents: false,
        selectedStudent: null,
        students: [],
    },
    groupStatementsTable: {
        isLoadingStatements: false,
        selectedStatement: null,
        statements: []
    },
    studentStatementsTable: {
        selectPractices: false,
        isLoadingStatements: false,
        selectedStatement: null,
        statementsContent: {
            average: 0,
            statements: []
        }
    },
    groupStatementsDisciplineTable: {
        isLoadingStatements: false,
        selectedStatement: null,
        statementsContent: {
            average: 0,
            statements: []
        }
    },
    studentAbsencesTable: {
        onlyPaidAbsences: false,
        isLoadingAbsences: false,
        absencesContent: {
            hoursPaid: 0,
            hoursNotPaid: 0,
            hoursAll: 0,
            absences: []
        }
    }
}

const tablesSlice = createSlice({
    name: "tablesSlice",
    initialState,
    reducers: {
        setIsLoadingGroups: (state, action: PayloadAction<boolean>) => {
            state.groupsTable.isLoadingGroups = action.payload
        },
        setSelectedGroup: (state, action: PayloadAction<GroupType | null>) => {
            state.groupsTable.selectedGroup = action.payload
        },
        setGroups: (state, action: PayloadAction<GroupType[]>) => {
            state.groupsTable.groups = action.payload
        },
        setWatchDeletedStudents: (state, action: PayloadAction<boolean>) => {
            state.studentsTable.watchDeletedStudents = action.payload
        },
        setIsLoadingStudents: (state, action: PayloadAction<boolean>) => {
            state.studentsTable.isLoadingStudents = action.payload
        },
        setSelectedStudent: (state, action: PayloadAction<StudentType | null>) => {
            state.studentsTable.selectedStudent = action.payload
        },
        setStudents: (state, action: PayloadAction<StudentType[]>) => {
            state.studentsTable.students = action.payload
        },
        setIsLoadingGroupStatements: (state, action: PayloadAction<boolean>) => {
            state.groupStatementsTable.isLoadingStatements = action.payload
        },
        setSelectedGroupStatement: (state, action: PayloadAction<GroupStatementType | null>) => {
            state.groupStatementsTable.selectedStatement = action.payload
        },
        setGroupStatements: (state, action: PayloadAction<GroupStatementType[]>) => {
            state.groupStatementsTable.statements = action.payload
        },
        setSelectPractices: (state, action: PayloadAction<boolean>) => {
            state.studentStatementsTable.selectPractices = action.payload
        },
        setIsLoadingStudentStatements: (state, action: PayloadAction<boolean>) => {
            state.studentStatementsTable.isLoadingStatements = action.payload
        },
        setSelectedStudentStatement: (state, action: PayloadAction<StudentStatementType | null>) => {
            state.studentStatementsTable.selectedStatement = action.payload
        },
        setStudentStatements: (state, action: PayloadAction<StudentStatementsContentType | null>) => {
            if (action.payload)
                state.studentStatementsTable.statementsContent = action.payload
            else {
                state.studentStatementsTable.statementsContent.average = 0
                state.studentStatementsTable.statementsContent.statements = []
            }
        },
        setIsLoadingGroupStatementsDiscipline: (state, action: PayloadAction<boolean>) => {
            state.groupStatementsDisciplineTable.isLoadingStatements = action.payload
        },
        setSelectedGroupStatementDiscipline: (state, action: PayloadAction<StudentStatementType | null>) => {
            state.groupStatementsDisciplineTable.selectedStatement = action.payload
        },
        setGroupStatementsDiscipline: (state, action: PayloadAction<StudentStatementsContentType | null>) => {
            if (action.payload)
                state.groupStatementsDisciplineTable.statementsContent = action.payload
            else {
                state.groupStatementsDisciplineTable.statementsContent.average = 0
                state.groupStatementsDisciplineTable.statementsContent.statements = []
            }
        },
        setOnlyPaidAbsences: (state, action: PayloadAction<boolean>) => {
            state.studentAbsencesTable.onlyPaidAbsences = action.payload
        },
        setIsLoadingStudentAbsences: (state, action: PayloadAction<boolean>) => {
            state.studentAbsencesTable.isLoadingAbsences = action.payload
        },
        setStudentAbsences: (state, action: PayloadAction<StudentAbsencesContentType | null>) => {
            if (action.payload)
                state.studentAbsencesTable.absencesContent = action.payload
            else {
                state.studentAbsencesTable.absencesContent.hoursAll = 0
                state.studentAbsencesTable.absencesContent.hoursNotPaid = 0
                state.studentAbsencesTable.absencesContent.hoursPaid = 0
                state.studentAbsencesTable.absencesContent.absences = []
            }
        },
        addStudentToStudents: (state, action: PayloadAction<StudentType>) => {
            state.studentsTable.students.push(action.payload)
        },
        editStudentInStudents: (state, action: PayloadAction<StudentType>) => {
            Object.assign(state.studentsTable.students.find(value => value.id === action.payload.id) as StudentType, action.payload)
        },
        fetchGroupsByFacultyIdAndLearnYearAndSemester: (state, action: PayloadAction<{
            facultyId?: number,
            learnYear?: number,
            semester?: string
        }>) => {

        },
        fetchGroupStatementsByGroupIdAndSemesterNumber: (state, action: PayloadAction<{
            groupId: number,
            semesterNumber: number
        }>) => {

        },
        fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences: (state, action: PayloadAction<{
            caseNo: number,
            semesterNumber: number,
            semesterMonthNumber: number | null,
            onlyPaidAbsences: boolean
        }>) => {

        },
        fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices: (state, action: PayloadAction<{
            caseNo: number,
            semesterNumber: number,
            selectPractices: boolean
        }>) => {

        },
        fetchGroupStatementsDisciplineByStatementId: (state, action: PayloadAction<number>) => {

        },
        fetchStudentsByGroupId: (state, action: PayloadAction<number>) => {

        },
        fetchStudentsByCaseNo: (state, action: PayloadAction<string>) => {

        },
        updateSelectedStudent: (state, action: PayloadAction<StudentType>) => {

        }
    }
})

export const {
    setIsLoadingStudentAbsences,
    setStudentAbsences,
    setIsLoadingStudentStatements,
    setIsLoadingGroupStatements,
    setGroupStatements,
    setSelectedGroupStatement,
    setGroups,
    setSelectedStudentStatement,
    setOnlyPaidAbsences,
    setSelectedGroup,
    setWatchDeletedStudents,
    setStudentStatements,
    setSelectPractices,
    setIsLoadingGroups,
    setStudents,
    setSelectedStudent,
    setIsLoadingStudents,
    fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences,
    fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices,
    fetchGroupsByFacultyIdAndLearnYearAndSemester,
    fetchGroupStatementsByGroupIdAndSemesterNumber,
    editStudentInStudents,
    addStudentToStudents,
    fetchGroupStatementsDisciplineByStatementId,
    fetchStudentsByGroupId,
    fetchStudentsByCaseNo,
    updateSelectedStudent,
    setIsLoadingGroupStatementsDiscipline,
    setSelectedGroupStatementDiscipline,
    setGroupStatementsDiscipline
} = tablesSlice.actions

export default tablesSlice.reducer