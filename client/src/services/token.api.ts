import client from './axios.client'
import api from '.'
import { IResponse } from '~/models/IResponse'
import { Token } from '~/models/token'

const generate = async ({ refresh_token }: { refresh_token: string }): Promise<IResponse<Token>> => {
  return await client.post(api.route.auth.refreshToken, {
    refreshToken: refresh_token
  })
}

const logout = async (): Promise<IResponse<undefined>> => {
  return await client.get(api.route.auth.logout)
}

const removeAccessToken = (): void => {
  localStorage.removeItem('access_token')
}

const getAccessToken = (): string | null => {
  const _at = localStorage.getItem('access_token')
  if (_at) {
    const at = JSON.parse(_at)
    if (at.timestamp + 24 * 60 * 60 * 1000 > Date.now()) {
      return at.value
    } else {
      removeAccessToken()
    }
  }
  return null
}

const setAccessToken = (token: string): void => {
  const at = {
    value: token,
    timestamp: Date.now() + 24 * 60 * 60 * 1000
  }
  localStorage.setItem('access_token', JSON.stringify(at))
}

const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token')
}

const setRefreshToken = (token: string): void => {
  localStorage.setItem('refresh_token', token)
}

const removeRefreshToken = (): void => {
  localStorage.removeItem('refresh_token')
}

export default {
  generate,
  logout,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
}
