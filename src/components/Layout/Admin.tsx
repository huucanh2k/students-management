import { Box, createStyles, makeStyles } from "@material-ui/core"
import * as React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import Dashboard from "../../features/dashboard"
import StudentFeature from "../../features/student"
import { Header, Siderbar } from "../Common"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gridTemplateRows: "auto 1fr",
    gridTemplateAreas: `'header header' 'sidebar main'`,

    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: "main",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}))

export function AdminLayout() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Siderbar />
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  )
}
