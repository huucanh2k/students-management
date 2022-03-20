import * as React from "react"
import { Navigate, Route, RouteProps } from "react-router-dom"

export interface PrivateRouteProps {
  children: React.ReactElement
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isLogin = Boolean(localStorage.getItem("access_token"))

  if (!isLogin) return <Navigate to={"/login"} />

  return children
}
