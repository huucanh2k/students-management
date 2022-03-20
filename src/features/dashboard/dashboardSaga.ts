import { City } from "./../../models/city"
import { all, call, put, takeLatest } from "redux-saga/effects"
import cityApi from "../../api/cityApi"
import studentApi from "../../api/studentApi"
import { ListResponse, Student } from "../../models"
import { dashboardActions, RankingByCity } from "./dashboardSlice"

function* fetchDashboardStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ])

  const statisticList = responseList.map((x) => x.pagination._totalRows)
  const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statisticList
  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      hightMarkCount,
      lowMarkCount,
    })
  )
}

//Fetch highest student list
function* fethchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  })

  yield put(dashboardActions.setHighestStudentList(data))
}

//Fetch lowest student list
function* fethchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  })

  yield put(dashboardActions.setlLowestStudentList(data))
}

//Fetch ranking by city list
function* fethchRankingByCityList() {
  // Fetch list city
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll)

  // Fetch ranking per city
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "desc",
      _order: "desc",
      city: city.code,
    })
  )

  const responseList: Array<ListResponse<Student>> = yield all(callList)
  const rankingByCityList: Array<RankingByCity> = responseList.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      cityName: cityList[idx].name,
      rankingList: x.data,
    })
  )

  // Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList))
}

// Fetch dashboard data
function* fetchDashboardData() {
  try {
    yield all([
      call(fetchDashboardStatistics),
      call(fethchHighestStudentList),
      call(fethchLowestStudentList),
      call(fethchRankingByCityList),
    ])

    yield put(dashboardActions.fetchDataSuccess())
  } catch (error) {
    yield put(dashboardActions.fetchDataFailed())
    console.log("Failed to fetch dashboard data")
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData, fetchDashboardData)
}
