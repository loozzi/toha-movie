import { call, fork, put, take } from 'redux-saga/effects'
import { notification } from 'antd'

import api from '~/services'
import { history } from '~/configs/history'
import { authActions } from './auth.slice'
import routesConfig from '~/configs/routes.config'
import { AuthPayload, User } from '~/models/user'
import { Token } from '~/models/token'
import { IResponse } from '~/models/IResponse'

function* handleLogin(payload: AuthPayload) {
  try {
    yield call(notification.info, {
      message: 'Đăng nhập',
      description: 'Đang đăng nhập...'
    })

    const fetch = new Promise<IResponse<Token>>(async (resolve, reject) => {
      try {
        const resp = await api.auth.login(payload)
        resolve(resp)
      } catch (error) {
        reject({
          status: 500,
          message: 'Lỗi hệ thống'
        })
      }
    })
      .then((data) => data)
      .catch((error) => error)

    const resp: IResponse<Token> = yield fetch.then((data) => data).catch((error) => error)

    if (resp.status === 200) {
      yield put(authActions.loginSuccess(resp.elements!.user))
      yield call(notification.success, {
        message: 'Đăng nhập',
        description: 'Đăng nhập thành công. Chào mừng trở lại'
      })
      const { accessToken, refreshToken } = resp.elements!.user
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      yield call(history.push, routesConfig.home)
    } else if (resp.status === 401) {
      yield call(notification.error, {
        message: 'Đăng nhập',
        description: 'Sai tên đăng nhập hoặc mật khẩu'
      })
    } else if (resp.status === 404) {
      yield call(notification.error, {
        message: 'Đăng nhập',
        description: 'Tài khoản không tồn tại'
      })
    } else {
      yield call(notification.success, {
        message: 'Đăng nhập',
        description: 'Lỗi hệ thống'
      })
    }
  } catch (error) {
    yield put(authActions.loginFailed())
  }
}

function* handleLogout() {}

function* handleRegister() {}

function* watchLoginFlow() {
  while (true) {
    const { payload } = yield take(authActions.login.type)
    yield fork(handleLogin, payload)
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
