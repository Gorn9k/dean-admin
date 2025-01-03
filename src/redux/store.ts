import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modelsPageReducer from "./modalsSlice"
import menuReducer from "./menuSlice"
import userReducer from "./userSlice"
import selectorsReducer from "./selectorsSlice"
import tablesReducer from "./tablesSlice"
import studentReducer from "./studentSlice"
import rootSaga from "../sagas/rootSaga";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({
    modals: modelsPageReducer,
    selectors: selectorsReducer,
    menu: menuReducer,
    user: userReducer,
    tables: tablesReducer,
    student: studentReducer
});

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
     middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;