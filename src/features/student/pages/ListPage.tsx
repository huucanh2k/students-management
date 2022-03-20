import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import * as React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import StudentFilters from "../components/studentFilters"
import StudentTable from "../components/studentTable"
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
    zIndex: 1,
  },
}))

export default function ListPage() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const studentList = useAppSelector(selectStudentList)
  const filter = useAppSelector(selectStudentFilter)
  const pagination = useAppSelector(selectStudentPagination)
  const loading = useAppSelector(selectStudentLoading)

  console.log("Student list: ", studentList)

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [filter])

  const handleChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    )
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h5">Students</Typography>
        <Button variant="contained" color="primary">
          ADD NEW STUDENT
        </Button>
      </Box>

      <Box mt={3}>
        <StudentFilters />
      </Box>

      <StudentTable studentList={studentList} />
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}
