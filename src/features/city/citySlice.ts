import { City } from "./../../models/city"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Satellite } from "@material-ui/icons"
import { ListResponse } from "../../models"
import { RootState } from "../../app/store"
export interface cityState {
  list: City[]
  loading: boolean
}

const initialState: cityState = {
  list: [],
  loading: false,
}

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false
      state.list = action.payload.data
    },
    fetchCityListFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const cityActions = citySlice.actions

// Selectors
export const selectCityList = (state: RootState) => state.city.list
export const selectCityMap = createSelector(selectCityList, (cityList) => {
  const cityMap = cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city

    return map
  }, {})
  return cityMap
})

// Reducer
const cityReducer = citySlice.reducer
export default cityReducer
