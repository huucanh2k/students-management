import * as React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { cityActions } from "../city/citySlice"
import { AddEditPage } from "./pages/AddEditPage"
import ListPage from "./pages/ListPage"

export interface DashboardProps {}

export default function StudentFeature() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [])

  return <Outlet />
}
