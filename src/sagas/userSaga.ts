import {PayloadAction} from "@reduxjs/toolkit";
import {call, CallEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getAuthority} from "../api/dean-api";
import {setHasAuthority} from "../redux/userSlice";
import {fetchHasAuthority} from "../redux/modalsSlice";

function* authorizationSaga(action: PayloadAction): Generator<CallEffect | PutEffect, void, void> {
    try {
        yield call(getAuthority)
        yield put(setHasAuthority(true))
    } catch (error) {
        console.log(error)
        window.location.href = `https://auth.vstu.by/login?redirectUrl=https://internal.vstu.by${process.env.PUBLIC_URL}/`
    }
}

export default function* userSaga() {
    yield takeLatest(fetchHasAuthority.type, authorizationSaga);
}