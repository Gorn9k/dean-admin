import {PayloadAction} from "@reduxjs/toolkit";
import {call, CallEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {
    FacultyType,
    getCitizenship,
    getFaculties,
    getGroupSemesters,
    getInstitutions,
    getLanguages,
    getPaymentTypes,
    getSpecializationsByGroupId,
    getStudentSemesters
} from "../api/dean-api";
import {
    fetchCitizenship,
    fetchFaculties,
    fetchGroupSemestersByGroupId, fetchInstitutions, fetchLanguages,
    fetchPaymentTypes,
    fetchSpecializationsByGroupId,
    fetchStudentSemestersByCaseNo,
    Option,
    setCitizenship,
    setFaculties,
    setGroupSemesters,
    setInstitutions,
    setIsLoadingFaculties,
    setIsLoadingGroupSemesters,
    setIsLoadingStudentSemesters,
    setLanguages,
    setPaymentTypes,
    setSpecializations,
    setStudentSemesters
} from "../redux/selectorsSlice";

function* facultiesSaga(): Generator<CallEffect | PutEffect, void, FacultyType[]> {
    try {
        yield put(setIsLoadingFaculties(true))
        const response = yield call(getFaculties)
        yield put(setFaculties(response.map(value => {
            if (value.id && value.shortName)
                return {value: value.id, label: value.shortName}
            return null
        }).filter(value => !!value) as Option[]))
        yield put(setIsLoadingFaculties(false))
    } catch (error) {
        console.log(error)
    }
}

function* groupSemestersSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect, void, number[]> {
    try {
        yield put(setIsLoadingGroupSemesters(true))
        const response = yield call(getGroupSemesters, action.payload)
        yield put(setGroupSemesters(response.map(value => ({value: value, label: `${value}`}))))
        yield put(setIsLoadingGroupSemesters(false))
    } catch (error) {
        console.log(error)
    }
}

function* studentSemestersSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect, void, number[]> {
    try {
        yield put(setIsLoadingStudentSemesters(true))
        const response = yield call(getStudentSemesters, action.payload)
        yield put(setStudentSemesters(response.map(value => ({value: value, label: `${value}`}))))
        yield put(setIsLoadingStudentSemesters(false))
    } catch (error) {
        console.log(error)
    }
}

function* specializationsSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect, void, {
    id?: number | null,
    name?: string | null
}[]> {
    try {
        const response = yield call(getSpecializationsByGroupId, action.payload)
        yield put(setSpecializations(response.map(value => {
            if (value.id && value.name)
                return {value: value.id, label: value.name}
            return null
        }).filter(value => !!value) as Option[]))
    } catch (error) {
        console.log(error)
    }
}

function* paymentTypesSaga(): Generator<CallEffect | PutEffect, void, string[]> {
    try {
        const response = yield call(getPaymentTypes)
        yield put(setPaymentTypes(response.map((value, index) => ({value: index, label: value}))))
    } catch (error) {
        console.log(error)
    }
}

function* citizenshipSaga(): Generator<CallEffect | PutEffect, void, {id?: number | null, name?: string | null}[]> {
    try {
        const response = yield call(getCitizenship)
        yield put(setCitizenship(response.map(value => {
            if (value.id && value.name)
                return {value: value.id, label: value.name}
            return null
        }).filter(value => !!value) as Option[]))
    } catch (error) {
        console.log(error)
    }
}

function* institutionsSaga(): Generator<CallEffect | PutEffect, void, {id?: number | null, fullName?: string | null}[]> {
    try {
        const response = yield call(getInstitutions)
        yield put(setInstitutions(response.map(value => {
            if (value.id && value.fullName)
                return {value: value.id, label: value.fullName}
            return null
        }).filter(value => !!value) as Option[]))
    } catch (error) {
        console.log(error)
    }
}

function* languagesSaga(): Generator<CallEffect | PutEffect, void, {id?: number | null, name?: string | null}[]> {
    try {
        const response = yield call(getLanguages)
        yield put(setLanguages(response.map(value => {
            if (value.id && value.name)
                return {value: value.id, label: value.name}
            return null
        }).filter(value => !!value) as Option[]))
    } catch (error) {
        console.log(error)
    }
}

export default function* selectorsSaga() {
    yield takeLatest(fetchFaculties.type, facultiesSaga);
    yield takeLatest(fetchGroupSemestersByGroupId.type, groupSemestersSaga);
    yield takeLatest(fetchStudentSemestersByCaseNo.type, studentSemestersSaga);
    yield takeLatest(fetchSpecializationsByGroupId.type, specializationsSaga);
    yield takeLatest(fetchPaymentTypes.type, paymentTypesSaga);
    yield takeLatest(fetchCitizenship.type, citizenshipSaga);
    yield takeLatest(fetchInstitutions.type, institutionsSaga);
    yield takeLatest(fetchLanguages.type, languagesSaga);
}