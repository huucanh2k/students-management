import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import * as React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { authActions, selectIsLogging } from "../authSlice"

export interface LoginPageProps {}

const useStyles = makeStyles((themes) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  box: {
    padding: themes.spacing(2),
  },
}))

export default function LoginPage(props: LoginPageProps) {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(selectIsLogging)

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: "",
        password: "",
      })
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLoginClick}
          >
            {isLogging ? <CircularProgress size={20} color="primary" /> : ""}{" "}
            <span style={{ marginLeft: "5px" }}>Fake Login</span>
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
