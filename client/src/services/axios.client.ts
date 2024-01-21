import axios from 'axios'
import { InternalAxiosRequestConfig } from 'axios'
import { history } from '~/configs/history'
import api from '.'
import { IResponse } from '~/models/IResponse'
import { Token } from '~/models/token'
import routesConfig from '~/configs/routes.config'

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
      api.route.auth.resetPassword
    ]
    const flag = whiteList.some((item) => config.url?.includes(item))

    if (!flag) {
      try {
        let access_token = localStorage.getItem('access_token')
        if (!access_token) {
          const refresh_token = localStorage.getItem('refresh_token')
          if (refresh_token) {
            const { status, elements }: IResponse<Token> = await api.token.generate({ refresh_token })
            if (status === 200) {
              const { accessToken, refreshToken }: Token = elements as Token
              if (!accessToken || !refreshToken) history.push(routesConfig.auth.login)

              localStorage.setItem('access_token', accessToken)
              localStorage.setItem('refresh_token', refreshToken)
              access_token = accessToken
            }
          } else {
            history.push(routesConfig.auth.login)
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
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default client
