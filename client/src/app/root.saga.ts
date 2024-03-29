import { all } from 'redux-saga/effects'
import authSaga from '~/hooks/auth/auth.saga'
import headerSaga from '~/hooks/header/header.saga'
import homeSaga from '~/hooks/home/home.saga'
import movieSaga from '~/hooks/movie/movie.saga'

export default function* rootSaga() {
  yield all([authSaga(), headerSaga(), homeSaga(), movieSaga()])
}
