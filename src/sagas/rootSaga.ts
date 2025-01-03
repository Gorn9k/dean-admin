import {all} from 'redux-saga/effects';
import userSaga from "./userSaga";
import tablesSaga from "./tablesSaga";
import selectorsSaga from "./selectorsSaga";
import studentSaga from "./studentSaga";
import menuSaga from "./menuSaga";

export default function* rootSaga() {
    yield all([
        userSaga(),
        tablesSaga(),
        studentSaga(),
        selectorsSaga(),
        menuSaga()
    ]);
}