import {PayloadAction} from "@reduxjs/toolkit";
import {call, CallEffect, put, PutEffect, TakeEffect, takeLatest} from "redux-saga/effects";
import {getStudentById, StudentType} from "../api/dean-api";
import {setIsLoadingStudents} from "../redux/tablesSlice";
import {fetchStudentById, setMenuVisible, setSelectedRowId} from "../redux/menuSlice";

function* studentByIdSaga(action: PayloadAction<number>): Generator<CallEffect | PutEffect | TakeEffect, void, StudentType> {
    try {
        yield put(setIsLoadingStudents(true))
        const response = yield call(getStudentById, action.payload)
        yield put(setMenuVisible(true));
        yield put(setSelectedRowId(response))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingStudents(false))
    }
}

export default function* menuSaga() {
    yield takeLatest(fetchStudentById.type, studentByIdSaga);
}