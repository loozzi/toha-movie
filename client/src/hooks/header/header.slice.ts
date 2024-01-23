import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category, Country } from '~/models/entity'

interface HeaderState {
  loading: boolean
  categories: Category[]
  countries: Country[]
}

const initialState: HeaderState = {
  loading: false,
  categories: [],
  countries: []
}

const headerSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    fetchHeader(state) {
      state.loading = true
    },
    fetchCategorySuccess(state, actions: PayloadAction<Category[]>) {
      state.loading = false
      state.categories = actions.payload.sort((a, b) => a.slug.localeCompare(b.slug))
    },
    fetchCountrySuccess(state, actions: PayloadAction<Country[]>) {
      state.loading = false
      state.countries = actions.payload.sort((a, b) => a.slug.localeCompare(b.slug))
    },
    fetchCategoryFailed(state) {
      state.loading = false
    },
    fetchCountryFailed(state) {
      state.loading = false
    }
  }
})

// Actions
export const headerActions = headerSlice.actions

// Selectors
export const selectLoadingHeader = (state: { header: HeaderState }) => state.header.loading
export const selectCategories = (state: { header: HeaderState }) => state.header.categories
export const selectCountries = (state: { header: HeaderState }) => state.header.countries

// Reducers
const headerReducer = headerSlice.reducer
export default headerReducer
