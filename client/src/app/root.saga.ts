import { all } from 'redux-saga/effects'
import authSaga from '~/hooks/auth/auth.saga'
import headerSaga from '~/hooks/header/header.saga'

export default function* rootSaga() {
  yield all([authSaga(), headerSaga()])
}
