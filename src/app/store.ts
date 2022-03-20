import createSagaMiddleware from "@redux-saga/core"
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import cityReducer from "../features/city/citySlice"
import counterReducer from "../features/counter/counterSlice"
import dashboardReducer from "../features/dashboard/dashboardSlice"
import studentReducer from "../features/student/studentSlice"
import rootSaga from "./rootSaga"

//create sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

//Config store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer,
  },
  //add saga to middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

//run rootsaga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
