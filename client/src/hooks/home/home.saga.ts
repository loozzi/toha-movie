import { all, call, put, takeLatest } from 'redux-saga/effects'
import { homeActions } from './home.slice'
import api from '~/services'
import { IResponse } from '~/models/IResponse'
import { PaginationResponse } from '~/models/pagination'
import { Movie } from '~/models/movies'

function* fetchLatestSeries() {
  const resp: IResponse<PaginationResponse<Movie>> = yield call(api.movie.getAll, {
    limit: 10,
    page: 1,
    type: 'series'
  })
  if (resp.status === 200) {
    yield put(homeActions.fetchSeriesSuccess(resp.elements!.items))
  } else {
    yield put(homeActions.fetchFailed('series'))
  }
}

function* fetchLatestSingles() {
  const resp: IResponse<PaginationResponse<Movie>> = yield call(api.movie.getAll, {
    limit: 10,
    page: 1,
    type: 'single'
  })
  if (resp.status === 200) {
    yield put(homeActions.fetchSinglesSuccess(resp.elements!.items))
  } else {
    yield put(homeActions.fetchFailed('singles'))
  }
}

function* fetchLatestCartoons() {
  const resp: IResponse<PaginationResponse<Movie>> = yield call(api.movie.getAll, {
    limit: 10,
    page: 1,
    type: 'hoathinh'
  })
  if (resp.status === 200) {
    yield put(homeActions.fetchCartoonsSuccess(resp.elements!.items))
  } else {
    yield put(homeActions.fetchFailed('cartoons'))
  }
}

function* fetchLatestTvShows() {
  const resp: IResponse<PaginationResponse<Movie>> = yield call(api.movie.getAll, {
    limit: 10,
    page: 1,
    type: 'tvshows'
  })
  if (resp.status === 200) {
    yield put(homeActions.fetchTvShowsSuccess(resp.elements!.items))
  } else {
    yield put(homeActions.fetchFailed('tvShows'))
  }
}

function* fetchHomeData() {
  yield all([call(fetchLatestSeries), call(fetchLatestSingles), call(fetchLatestCartoons), call(fetchLatestTvShows)])
}

export default function* homeSaga() {
  yield takeLatest(homeActions.fetchData.type, fetchHomeData)
}
