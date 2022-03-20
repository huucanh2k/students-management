import { studentActions } from "./studentSlice"
import { call, put, takeLatest } from "redux-saga/effects"
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
  } catch (error) {
    console.log("Failed error fetch student list")
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList)
}
