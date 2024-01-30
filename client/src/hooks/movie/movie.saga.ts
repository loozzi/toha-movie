import { call, put, takeLatest } from 'redux-saga/effects'
import { IResponse } from '~/models/IResponse'
import { MovieDetail, MovieServerResponse } from '~/models/movies'
import api from '~/services'
import { movieActions } from './movie.slice'
import { HistoryLocalStorage } from '~/pages/movie/watch'
import { RateRequest, RateResponse } from '~/models/rate'
import { notification } from 'antd'

function* fetchMovie(payload: any) {
  const { slug, user_id } = payload.payload

  const resp: IResponse<MovieDetail> = yield api.movie.getDetail({ slug, user_id })

  if (resp.status === 200) {
    yield put(movieActions.fetchMovieSuccess(resp.elements!))
  } else {
    yield put(movieActions.fetchMovieFailed())
  }
}

function* fetchEpisode(payload: any) {
  const { slug } = payload.payload

  const resp: IResponse<MovieServerResponse> = yield api.movie.getEpisodes(slug)

  if (resp.status === 200) {
    yield put(movieActions.fetchEpisodeSuccess(resp.elements!.items))
  } else {
    yield put(movieActions.fetchEpisodeFailed())
  }
}

function* saveHistory(payload: any) {
  const { movie_id, current_time, episode_name, server_id } = payload.payload as HistoryLocalStorage
  if (movie_id) {
    yield api.history.add({
      movie_id,
      current_time,
      server_id,
      episode_name
    })
  }
}

function* rateMovie(payload: any) {
  const { movie_id, score } = payload.payload as RateRequest
  const resp: IResponse<RateResponse> = yield api.movie.rate({ movie_id, score })
  if (resp.status === 200) {
    yield put(movieActions.rateMovieSuccess(resp.elements!))
    yield call(notification.success, {
      message: 'Đánh giá',
      description: 'Đánh giá phim thành công'
    })
  } else {
    yield call(notification.error, {
      message: 'Đánh giá',
      description: 'Đánh giá phim thất bại'
    })
  }
}

export default function* movieSaga() {
  yield takeLatest(movieActions.fetchMovie.type as any, fetchMovie)
  yield takeLatest(movieActions.fetchEpisode.type as any, fetchEpisode)
  yield takeLatest(movieActions.saveHistory.type as any, saveHistory)
  yield takeLatest(movieActions.rateMovie.type as any, rateMovie)
}
