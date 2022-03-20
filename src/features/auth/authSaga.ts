import { PayloadAction } from "@reduxjs/toolkit"
import { call, delay, fork, put, take } from "redux-saga/effects"
import { ErrorCallback } from "typescript"
import { authActions, LoginPayload } from "./authSlice"
function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    console.log("handle login payload: ", action)
    localStorage.setItem("access_token", "fake_token") //Set access token
    yield delay(1000)
    //redirect to admin page
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "Huu Canh",
      })
    )
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message))
  }
}

function* handleLogout() {
  delay(500)
  localStorage.removeItem("access_token")
  console.log("success logout")
  //redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"))
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      )
      yield fork(handleLogin, action)
    }

    yield take(authActions.logout)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
