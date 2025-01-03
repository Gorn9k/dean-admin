import {PayloadAction} from "@reduxjs/toolkit";
import {call, CallEffect, put, PutEffect, select, SelectEffect, TakeEffect, takeLatest} from "redux-saga/effects";
import {
    createStudentPhoto,
    getAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences,
    getGradesByCaseNoAndSemesterAndSelectPractices,
    getGradesByStatementId,
    getGroupsByFacultyIdAndYearAndSemester,
    getStatementsByGroupIdAndSemesterNumber,
    getStudentsByCaseNo,
    getStudentsByGroupId,
    GroupStatementType,
    GroupType,
    StudentAbsencesContentType,
    StudentStatementsContentType,
    StudentType,
    updateStudent
} from "../api/dean-api";
import {
    addStudentToStudents,
    editStudentInStudents,
    fetchGroupsByFacultyIdAndLearnYearAndSemester,
    fetchGroupStatementsByGroupIdAndSemesterNumber,
    fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences,
    fetchStudentsByCaseNo,
    fetchStudentsByGroupId,
    fetchGroupStatementsDisciplineByStatementId,
    fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices,
    setGroups,
    setGroupStatements, setGroupStatementsDiscipline,
    setIsLoadingGroups,
    setIsLoadingGroupStatements, setIsLoadingGroupStatementsDiscipline,
    setIsLoadingStudentAbsences,
    setIsLoadingStudents,
    setIsLoadingStudentStatements,
    setSelectedStudent,
    setStudentAbsences,
    setStudents,
    setStudentStatements,
    updateSelectedStudent
} from "../redux/tablesSlice";
import {RootState} from "../redux/store";
import {setIsEditingStudentInProcess, setIsOnEditMode} from "../redux/studentSlice";

function* groupsByFacultyIdAndYearAndSemesterSaga(action: PayloadAction<{
    facultyId?: number,
    learnYear?: number,
    semester?: string
}>):
    Generator<CallEffect | PutEffect, void, GroupType[]> {
    try {
        yield put(setIsLoadingGroups(true))
        const response = yield call(getGroupsByFacultyIdAndYearAndSemester, action.payload.facultyId,
            action.payload.learnYear, action.payload.semester)
        yield put(setGroups(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingGroups(false))
    }
}

function* groupStatementsByGroupIdAndSemesterNumberSaga(action: PayloadAction<{
    groupId: number,
    semesterNumber: number
}>): Generator<CallEffect | PutEffect, void, GroupStatementType[]> {
    try {
        yield put(setIsLoadingGroupStatements(true))
        const response = yield call(getStatementsByGroupIdAndSemesterNumber, action.payload.groupId, action.payload.semesterNumber)
        yield put(setGroupStatements(response))
        yield put(setIsLoadingGroupStatements(false))
    } catch (error) {
        console.log(error)
    }
}

function* studentsByCaseNoSaga(action: PayloadAction<string>): Generator<CallEffect | PutEffect, void, StudentType[]> {
    try {
        yield put(setIsLoadingStudents(true))
        const response = yield call(getStudentsByCaseNo, action.payload)
        yield put(setStudents(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingStudents(false))
    }
}

function* studentsByGroupIdSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect, void, StudentType[]> {
    try {
        yield put(setIsLoadingStudents(true))
        const response = yield call(getStudentsByGroupId, action.payload)
        yield put(setStudents(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingStudents(false))
    }
}

function* groupStatementsDisciplineByStatementIdSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect, void, StudentStatementsContentType> {
    try {
        yield put(setIsLoadingGroupStatementsDiscipline(true))
        const response = yield call(getGradesByStatementId, action.payload)
        yield put(setGroupStatementsDiscipline(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingGroupStatementsDiscipline(false))
    }
}

function* studentStatementsByCaseNoAndSemesterAndSelectPracticesSaga(action: PayloadAction<{
    caseNo: number,
    semesterNumber: number,
    selectPractices: boolean
}>): Generator<CallEffect | PutEffect | TakeEffect, void, StudentStatementsContentType> {
    try {
        yield put(setIsLoadingStudentStatements(true))
        const response = yield call(getGradesByCaseNoAndSemesterAndSelectPractices,
            action.payload.caseNo, action.payload.semesterNumber, action.payload.selectPractices)
        yield put(setStudentStatements(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingStudentStatements(false))
    }
}

function* studentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsencesSaga(action: PayloadAction<{
    caseNo: number,
    semesterNumber: number,
    semesterMonthNumber?: number,
    onlyPaidAbsences: boolean
}>): Generator<CallEffect | PutEffect | TakeEffect, void, StudentAbsencesContentType> {
    try {
        yield put(setIsLoadingStudentAbsences(true))
        const response = yield call(getAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences, action.payload.caseNo,
            action.payload.semesterNumber, action.payload.semesterMonthNumber || null, action.payload.onlyPaidAbsences)
        yield put(setStudentAbsences(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingStudentAbsences(false))
    }
}

function* updateSelectedStudentSaga(action: PayloadAction<StudentType>): Generator<CallEffect | PutEffect | SelectEffect, void, any> {
    try {
        yield put(setIsEditingStudentInProcess(true))

        let photoUrl = action.payload.photoUrl ?? ''

        if (photoUrl.includes('blob:')) {
            const formData = new FormData();
            const responsePhoto = yield call(fetch, photoUrl);
            const blob = yield responsePhoto.blob();
            const file = new File([blob], "image.jpeg", { type: blob.type });
            formData.append('file', file);
            photoUrl = `/api/v1/files/students/download?filename=${yield call(createStudentPhoto, formData)}`
        }

        const response = yield call(updateStudent, {...action.payload, photoUrl: photoUrl})
        yield put(setSelectedStudent(response))
        if (!action.payload.id)
            yield put(addStudentToStudents(response))
        else
            yield put(editStudentInStudents(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsOnEditMode(false))
        yield put(setIsEditingStudentInProcess(false))
    }
}

export default function* tablesSaga() {
    yield takeLatest(fetchGroupsByFacultyIdAndLearnYearAndSemester.type, groupsByFacultyIdAndYearAndSemesterSaga);
    yield takeLatest(fetchStudentsByCaseNo.type, studentsByCaseNoSaga);
    yield takeLatest(fetchStudentsByGroupId.type, studentsByGroupIdSaga);
    yield takeLatest(fetchGroupStatementsByGroupIdAndSemesterNumber.type, groupStatementsByGroupIdAndSemesterNumberSaga);
    yield takeLatest(fetchGroupStatementsDisciplineByStatementId.type, groupStatementsDisciplineByStatementIdSaga);
    yield takeLatest(fetchStudentStatementsByCaseNoAndSemesterAndSelectPractices.type, studentStatementsByCaseNoAndSemesterAndSelectPracticesSaga);
    yield takeLatest(fetchStudentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences.type, studentAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsencesSaga);
    yield takeLatest(updateSelectedStudent.type, updateSelectedStudentSaga);
}