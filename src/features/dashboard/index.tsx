import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { ArrowDownward, ArrowUpward, People } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { StatisticItem } from "./components/StatisticItem"
import { IoMan, IoWoman } from "react-icons/io5"
import { AiOutlineVerticalAlignTop } from "react-icons/ai"
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice"
import Widget from "./components/Widget"
import StudentRankingList from "./components/StudentRankingList"
import { City } from "../../models"
import cityApi from "../../api/cityApi"
import { cityActions } from "../city/citySlice"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
    zIndex: 1,
  },
  icon: {
    fontSize: "32px",
    color: "#3F51B5",
  },
}))

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const highestStudentList = useAppSelector(selectHighestStudentList)
  const lowestStudentList = useAppSelector(selectLowestStudentList)
  const statistics = useAppSelector(selectDashboardStatistics)
  const rankingByCityList = useAppSelector(selectRankingByCityList)

  useEffect(() => {
    dispatch(dashboardActions.fetchData())
    dispatch(cityActions.fetchCityList())
  }, [])

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistic Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<IoMan className={classes.icon} />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<IoWoman className={classes.icon} />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ArrowUpward fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.hightMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ArrowDownward fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      {/* All students ranking */}
      <Box mt={5}>
        <Typography variant="h4" component="h4">
          ALL STUDENTS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="STUDENT WITH HIGHEST MARK">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="STUDENT WITH LOWEST MARK">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4" component="h4">
          RANKING CITY
        </Typography>
        <Grid container spacing={3}>
          {rankingByCityList.map((cityList) => (
            <Grid item xs={12} md={6} lg={4} key={cityList.cityId}>
              <Widget title={cityList.cityName}>
                <StudentRankingList studentList={cityList.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
