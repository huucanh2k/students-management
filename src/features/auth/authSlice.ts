import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../models"

export interface AuthState {
  isLoggedIn: boolean
  logging?: boolean
  currentUser?: User
  isLoggingSuccess?: boolean
  isLogOutSuccess?: boolean
}

export interface LoginPayload {
  username: string
  password: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  isLoggingSuccess: false,
  isLogOutSuccess: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<User>) {
      console.log("login success")
      state.isLoggedIn = true
      state.currentUser = action.payload
      state.logging = false
      state.isLoggingSuccess = true
      state.isLogOutSuccess = false
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
    },
    logout(state) {
      state.isLoggedIn = false
      state.currentUser = undefined
      state.isLogOutSuccess = true
      state.isLoggingSuccess = false
    },
  },
})

// Actions
export const authActions = authSlice.actions

// Selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectIsLogging = (state: any) => state.auth.logging
export const selectIsLoggingSuccess = (state: any) =>
  state.auth.isLoggingSuccess
export const selecIsLogOutSuccess = (state: any) => state.auth.isLogOutSuccess

// Reducer
const authReducer = authSlice.reducer
export default authReducer
