import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import studentApi from "../../../api/studentApi"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { ListParams, Student } from "../../../models"
import {
  cityActions,
  selectCityList,
  selectCityMap,
} from "../../city/citySlice"
import StudentFilters from "../components/StudentFilters"
import StudentTable from "../components/StudentTable"
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
  const cityList = useAppSelector(selectCityList)
  const cityMap = useAppSelector(selectCityMap)

  let navigate = useNavigate()
  let location = useLocation()

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
  const handleChangeFilter = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter))
  }

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter))
  }

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student._id as string)
      dispatch(studentActions.fetchStudentList({ ...filter }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (student: Student) => {
    navigate(`${location.pathname}/${student._id}`)
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h5">Students</Typography>
        <Link to="add" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            ADD NEW STUDENT
          </Button>
        </Link>
      </Box>

      <Box my={3}>
        <StudentFilters
          filter={filter}
          listCity={cityList}
          onChange={handleChangeFilter}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEdit}
      />
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
