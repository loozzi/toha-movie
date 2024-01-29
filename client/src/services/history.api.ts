import client from './axios.client'
import api from '.'
import { PaginationParams, PaginationResponse } from '~/models/pagination'
import { IResponse } from '~/models/IResponse'
import { UserHistory } from '~/models/user'
import { HistoryLocalStorage } from '~/pages/movie/watch'

const getAll = async (params: PaginationParams): Promise<IResponse<PaginationResponse<UserHistory>>> => {
  return await client.get(api.route.history.all, {
    params: params
  })
}

const add = async (data: HistoryLocalStorage): Promise<IResponse<undefined>> => {
  return await client.post(api.route.history.add, data)
}

const remove = async (movie_id: number): Promise<IResponse<undefined>> => {
  return await client.delete(api.route.history.delete, {
    params: {
      movie_id
    }
  })
}

export default {
  getAll,
  add,
  remove
}
