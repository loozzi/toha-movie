import { call, fork, put, take } from 'redux-saga/effects'
import { notification } from 'antd'

import api from '~/services'
import { history } from '~/configs/history'
import { authActions } from './auth.slice'
import routesConfig from '~/configs/routes.config'
import { AuthPayload, RegisterPayload } from '~/models/user'
import { Token } from '~/models/token'
import { IResponse } from '~/models/IResponse'

function* handleLogin(payload: AuthPayload) {
  yield put(authActions.login())
  try {
    yield call(notification.info, {
      message: 'Đăng nhập',
      description: 'Đang đăng nhập...'
    })

    const fetch = api.auth
      .login(payload)
      .then((resp: IResponse<Token>) => resp)
      .catch(() => ({
        status: 500,
        message: 'Lỗi hệ thống'
      }))

    const resp: IResponse<Token> = yield fetch

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
      yield put(authActions.loginFailed())
      yield call(notification.error, {
        message: 'Đăng nhập',
        description: 'Sai tên đăng nhập hoặc mật khẩu'
      })
    } else if (resp.status === 404) {
      yield put(authActions.loginFailed())
      yield call(notification.error, {
        message: 'Đăng nhập',
        description: 'Tài khoản không tồn tại'
      })
    } else {
      yield put(authActions.loginFailed())
      yield call(notification.success, {
        message: 'Đăng nhập',
        description: 'Lỗi hệ thống'
      })
    }
  } catch (error) {
    yield put(authActions.loginFailed())
  }
}

function* handleLogout() {
  const fetch: Promise<IResponse<undefined>> = api.token
    .logout()
    .then((resp: IResponse<undefined>) => resp)
    .catch(() => ({
      status: 500,
      message: 'Lỗi hệ thống'
    }))

  const resp: IResponse<undefined> = yield fetch
  if (resp.status === 200) {
    yield put(authActions.logout())
    yield call(notification.success, {
      message: 'Đăng xuất',
      description: 'Đăng xuất thành công'
    })
  } else {
    yield call(notification.error, {
      message: 'Đăng xuất',
      description: 'Lỗi hệ thống'
    })
  }
}

function* handleRegister(payload: RegisterPayload) {
  yield put(authActions.login())
  try {
    const fetch: Promise<IResponse<Token>> = api.auth
      .register(payload)
      .then((resp: IResponse<Token>) => resp)
      .catch(() => ({
        status: 500,
        message: 'Lỗi hệ thống'
      }))

    const resp: IResponse<Token> = yield fetch
    if (resp.status === 201) {
      yield put(authActions.loginSuccess(resp.elements!.user))
      yield call(notification.success, {
        message: 'Đăng ký',
        description: 'Đăng ký thành công'
      })
      const { accessToken, refreshToken } = resp.elements!.user
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      yield call(history.push, routesConfig.auth.verify)
    } else if (resp.status === 400) {
      yield put(authActions.loginFailed())
      yield call(notification.error, {
        message: 'Đăng ký',
        description: 'Tài khoản đã đã tồn tại'
      })
    } else {
      yield put(authActions.loginFailed())
      yield call(notification.error, {
        message: 'Đăng ký',
        description: 'Lỗi hệ thống'
      })
    }
  } catch (error) {
    yield put(authActions.loginFailed())
  }
}

function* watchLoginFlow() {
  while (true) {
    const refreshToken = localStorage.getItem('refresh_token')
    let isLogin = false
    if (!!refreshToken) {
      const fetch: Promise<IResponse<Token>> = api.token
        .generate({ refresh_token: refreshToken })
        .then((resp: IResponse<Token>) => resp)
        .catch(() => ({
          status: 500,
          message: 'Lỗi hệ thống'
        }))

      const resp: IResponse<Token> = yield fetch
      if (resp.status === 200) {
        yield put(authActions.loginSuccess(resp.elements!.user))
        const { accessToken, refreshToken } = resp.elements!
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        yield call(history.push, routesConfig.home)
        isLogin = true
      } else {
        isLogin = false
      }
    } else {
      isLogin = false
    }

    if (isLogin) {
      yield take(authActions.logout.type)
      yield call(handleLogout)
    } else {
      const { type, payload } = yield take(authActions.login.type)
      if (type === 'register') yield call(handleRegister, payload)
      else yield call(handleLogin, payload)
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
