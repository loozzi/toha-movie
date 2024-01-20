import client from './axios.client'
import api from '.'
import { IResponse } from '~/models/IResponse'
import { Token } from '~/models/token'

const generate = async ({ refresh_token }: { refresh_token: string }): Promise<IResponse<Token>> => {
  return await client.post(api.route.auth.refreshToken, {
    refreshToken: refresh_token
  })
}

export default {
  generate
}
