import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Movie } from '~/models/movies'

interface homeState {
  series: {
    loading: boolean
    data: Movie[]
  }
  singles: {
    loading: boolean
    data: Movie[]
  }
  cartoons: {
    loading: boolean
    data: Movie[]
  }
  tvShows: {
    loading: boolean
    data: Movie[]
  }
}

const initialState: homeState = {
  series: {
    loading: false,
    data: []
  },
  singles: {
    loading: false,
    data: []
  },
  cartoons: {
    loading: false,
    data: []
  },
  tvShows: {
    loading: false,
    data: []
  }
}

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    fetchData: (state) => {
      state.series.loading = true
      state.singles.loading = true
      state.cartoons.loading = true
      state.tvShows.loading = true
    },
    fetchSeriesSuccess: (state, actions: PayloadAction<Movie[]>) => {
      state.series.loading = false
      state.series.data = actions.payload
    },
    fetchSinglesSuccess: (state, actions: PayloadAction<Movie[]>) => {
      state.singles.loading = false
      state.singles.data = actions.payload
    },
    fetchCartoonsSuccess: (state, actions: PayloadAction<Movie[]>) => {
      state.cartoons.loading = false
      state.cartoons.data = actions.payload
    },
    fetchTvShowsSuccess: (state, actions: PayloadAction<Movie[]>) => {
      state.tvShows.loading = false
      state.tvShows.data = actions.payload
    },
    fetchFailed: (state, actions: PayloadAction<string>) => {
      return {
        ...state,
        [actions.payload]: {
          loading: false,
          data: []
        }
      }
    }
  }
})

// Actions
export const homeActions = homeSlice.actions

// Selectors
export const selectSeries = (state: { home: homeState }) => state.home.series
export const selectSingles = (state: { home: homeState }) => state.home.singles
export const selectCartoons = (state: { home: homeState }) => state.home.cartoons
export const selectTvShows = (state: { home: homeState }) => state.home.tvShows

// Reducer
const homeReducer = homeSlice.reducer
export default homeReducer
