import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MovieDetail, MovieServer } from '~/models/movies'

interface MovieSliceState {
  loading: boolean
  movie: MovieDetail | null
  server: MovieServer | null
}

const initialState: MovieSliceState = {
  loading: false,
  movie: null,
  server: null
}

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    fetchMovie: (state, action: PayloadAction<{ slug: string }>) => {
      state.loading = true
      state.movie = null
    },
    fetchEpisode: (state, action: any) => {
      state.loading = true
      state.server = null
    },
    fetchMovieSuccess: (state, action: PayloadAction<MovieDetail>) => {
      state.loading = false
      state.movie = action.payload
    },
    fetchEpisodeSuccess: (state, action: PayloadAction<MovieServer>) => {
      state.loading = false
      state.server = action.payload
    },
    fetchMovieFailed: (state) => {
      state.loading = false
    },
    fetchEpisodeFailed: (state) => {
      state.loading = false
    }
  }
})

// Actions
export const movieActions = movieSlice.actions

// Selectors
export const selectMovieLoading = (state: { movie: MovieSliceState }) => state.movie.loading
export const selectMovieDetail = (state: { movie: MovieSliceState }) => state.movie.movie
export const selectMovieServer = (state: { movie: MovieSliceState }) => state.movie.server

// Reducer
const movieReducer = movieSlice.reducer
export default movieReducer
