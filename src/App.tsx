import { Box, Button } from "@material-ui/core"
import React, { useEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import studentApi from "./api/studentApi"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { NotFound, PrivateRoute } from "./components/Common"
import { AdminLayout } from "./components/Layout"
import {
  authActions,
  selecIsLogOutSuccess,
  selectIsLoggingSuccess,
} from "./features/auth/authSlice"
import LoginPage from "./features/auth/pages/LoginPage"
import Dashboard from "./features/dashboard"
import StudentFeature from "./features/student"
import { AddEditPage } from "./features/student/pages/AddEditPage"
import ListPage from "./features/student/pages/ListPage"

function App() {
  const navigate = useNavigate()

  const isLoggingSuccess = useAppSelector(selectIsLoggingSuccess)
  const isLogOutSuccess = useAppSelector(selecIsLogOutSuccess)

  //Subcript
  useEffect(() => {
    if (isLoggingSuccess) {
      navigate("admin/dashboard")
    }
  }, [isLoggingSuccess])
  useEffect(() => {
    if (isLogOutSuccess) {
      navigate("login")
    }
  }, [isLogOutSuccess])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />}></Route>
      <Route path="/login" element={<LoginPage />} /> //Login
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<StudentFeature />}>
          <Route path="add" element={<AddEditPage />} />
          <Route path=":studentId" element={<AddEditPage />} />
          <Route path="" element={<ListPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} /> //NOT FOUND
    </Routes>
  )
}

export default App
