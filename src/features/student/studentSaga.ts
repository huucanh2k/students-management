import { studentActions } from "./studentSlice"
import { call, debounce, put, takeLatest } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit"
import { ListParams, ListResponse, Student } from "../../models"
import studentApi from "../../api/studentApi"

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    )

    yield put(studentActions.fetchStudentListSuccess(response))
  } catch (error) {}
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload))
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList)
  yield debounce(
    500,
    studentActions.setFilterWithDebounce.type,
    handleSearchDebounce
  )
}
