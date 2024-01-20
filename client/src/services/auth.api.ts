import client from './axios.client'
import api from '.'
import { AuthPayload, RegisterPayload } from '~/models/user'
import { IResponse } from '~/models/IResponse'
import { Token } from '~/models/token'

const login = async (payload: AuthPayload): Promise<IResponse<Token>> => {
  return await client.post(api.route.auth.login, payload)
}

const register = async (payload: RegisterPayload): Promise<IResponse<Token>> => {
  return await client.post(api.route.auth.register, payload)
}

export default {
  login,
  register
}
