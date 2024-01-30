import { notification } from 'antd'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { history } from '~/configs/history'
import routesConfig from '~/configs/routes.config'
import { IResponse } from '~/models/IResponse'
import { Token } from '~/models/token'
import api from '.'

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const whiteList: string[] = [
      api.route.auth.login,
      api.route.auth.register,
      api.route.auth.refreshToken,
      api.route.auth.resetPassword,
      api.route.movie.all
    ]
    const flag = whiteList.some((item) => config.url?.includes(item))

    if (!flag) {
      try {
        // let access_token = localStorage.getItem('access_token')
        let access_token = api.token.getAccessToken()
        if (!access_token) {
          const refresh_token = localStorage.getItem('refresh_token')
          if (refresh_token) {
            const { status, elements }: IResponse<Token> = await api.token.generate({ refresh_token })
            if (status === 200) {
              const { accessToken, refreshToken }: Token = elements as Token
              if (!accessToken || !refreshToken) history.push(routesConfig.auth.login)

              // localStorage.setItem('access_token', accessToken)
              api.token.setAccessToken(accessToken)
              // localStorage.setItem('refresh_token', refreshToken)
              api.token.setRefreshToken(refreshToken)
              access_token = accessToken
            }
          } else {
            // Khong den luot client xu li authentication 😏😏😏
            // history.push(routesConfig.auth.login)
            return config
          }
        }
        config.headers.Authorization = `Bearer ${access_token}`
      } catch (error) {
        return config
      }
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    const resp = response.data
    if (resp.message === 'Unauthorized') {
      notification.error({
        message: 'Đăng nhập',
        description: 'Phiên đăng nhập đã hết hạn'
      })
      history.push('/' + routesConfig.auth.login)
      api.token.removeAccessToken()
      api.token.removeRefreshToken()
    }
    return resp
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default client
