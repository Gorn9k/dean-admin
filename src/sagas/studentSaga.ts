import {PayloadAction} from "@reduxjs/toolkit";
import {call, CallEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getImageByUrl} from "../api/dean-api";
import {fetchImageByUrl, setImageUrl, setIsLoadingImage} from "../redux/studentSlice";

function* studentImageSaga(action: PayloadAction<string>): Generator<CallEffect | PutEffect, void, Blob> {
    try {
        yield put(setIsLoadingImage(true))
        const response = yield call(getImageByUrl, action.payload)
        response.size > 0 && (yield put(setImageUrl(URL.createObjectURL(response))))
        return
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setIsLoadingImage(false))
    }
}

export default function* studentSaga() {
    yield takeLatest(fetchImageByUrl.type, studentImageSaga);
}