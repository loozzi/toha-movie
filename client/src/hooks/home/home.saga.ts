import { all, call, put, takeLatest } from 'redux-saga/effects'
import { IResponse } from '~/models/IResponse'
import { Movie, MovieHomePage } from '~/models/movies'
import { PaginationResponse } from '~/models/pagination'
import api from '~/services'
import { homeActions } from './home.slice'

function* fetchHomeData() {
  const homeData: IResponse<MovieHomePage> = yield call(api.movie.getHome)
  if (homeData.status === 200) {
    yield all([
      put(homeActions.fetchSeriesSuccess(homeData.elements!.series)),
      put(homeActions.fetchSinglesSuccess(homeData.elements!.singles)),
      put(homeActions.fetchCartoonsSuccess(homeData.elements!.cartoons)),
      put(homeActions.fetchTvShowsSuccess(homeData.elements!.tvshows)),
      put(homeActions.fetchTheatersSuccess(homeData.elements!.theaters))
    ])
  } else {
    yield put(homeActions.fetchFailed('series'))
    yield put(homeActions.fetchFailed('singles'))
    yield put(homeActions.fetchFailed('cartoons'))
    yield put(homeActions.fetchFailed('tvShows'))
    yield put(homeActions.fetchFailed('theaters'))
  }
}

function* fetchSearchData({ payload }: ReturnType<typeof homeActions.search>) {
  const searchData: IResponse<PaginationResponse<Movie>> = yield call(api.movie.getAll, payload)
  if (searchData.status === 200) {
    console.log(searchData.elements!)
    yield put(homeActions.searchSuccess(searchData.elements!))
  } else {
    yield put(homeActions.searchFailed())
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.fetchData.type, fetchHomeData)
  yield takeLatest(homeActions.search.type, fetchSearchData)
}
