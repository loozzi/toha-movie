import { put, takeLatest } from 'redux-saga/effects'
import { IResponse } from '~/models/IResponse'
import { MovieDetail, MovieServerResponse } from '~/models/movies'
import api from '~/services'
import { movieActions } from './movie.slice'
import { HistoryLocalStorage } from '~/pages/movie/watch'

function* fetchMovie(payload: any) {
  const { slug } = payload.payload

  const resp: IResponse<MovieDetail> = yield api.movie.getDetail(slug)

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
    console.log(resp)
    yield put(movieActions.fetchEpisodeSuccess(resp.elements!.items))
  } else {
    yield put(movieActions.fetchEpisodeFailed())
  }
}

function* saveHistory(payload: any) {
  const { movie_id, current_time, episode_name, server_id } = payload.payload as HistoryLocalStorage
  if (movie_id) {
    const resp: IResponse<undefined> = yield api.history.add({
      movie_id,
      current_time,
      server_id,
      episode_name
    })
  }
}

export default function* movieSaga() {
  yield takeLatest(movieActions.fetchMovie.type as any, fetchMovie)
  yield takeLatest(movieActions.fetchEpisode.type as any, fetchEpisode)
}
