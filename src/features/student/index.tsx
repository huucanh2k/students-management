import * as React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { AddEditPage } from "./pages/AddEditPage"
import ListPage from "./pages/ListPage"

export interface DashboardProps {}

export default function StudentFeature() {
  return <Outlet />
}
