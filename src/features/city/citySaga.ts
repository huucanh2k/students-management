import { City } from "./../../models/city"
import { call, put, takeLatest } from "redux-saga/effects"
import cityApi from "../../api/cityApi"
import { ListResponse } from "../../models"
import { cityActions } from "./citySlice"
export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll)

    yield put(cityActions.fetchCityListSuccess(response))
  } catch (error) {
    console.log("Fetching city list error")
    yield put(cityActions.fetchCityListFailed())
  }
}
