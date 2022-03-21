import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core"
import { Search } from "@material-ui/icons"
import * as React from "react"
import { City, ListParams } from "../../../models"

export interface StudentFiltersProps {
  filter: ListParams
  listCity: City[]
  onChange: (newFilter: ListParams) => void
  onSearchChange: (newFilter: ListParams) => void
}

export default function StudentFilters({
  filter,
  onChange,
  onSearchChange,
  listCity,
}: StudentFiltersProps) {
  const searchRef = React.useRef<HTMLInputElement>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    }
    onSearchChange(newFilter)
  }

  const handleFilterChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void => {
    if (!onChange) return
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    }
    onChange(newFilter)
  }
  const handleSortChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void => {
    if (!onChange) return
    const value = e.target.value

    const [_sort, _order] = (value as string).split(".")

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    }
    onChange(newFilter)
  }

  const handleCleartFilterClick = () => {
    if (!onChange) return

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      name_like: undefined,
      city: undefined,
    }

    if (searchRef.current) {
      searchRef.current.value = ""
    }
    onChange(newFilter)
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              defaultValue={filter.name_like}
              onChange={handleChange}
              label="Search by name"
              endAdornment={<Search />}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ""}
              onChange={handleFilterChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {listCity &&
                listCity.map((city) => (
                  <MenuItem value={city.code} key={city.code}>
                    {city.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleCleartFilterClick}
          >
            CLEAR
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
