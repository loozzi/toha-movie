import client from './axios.client'
import api from '.'
import { IResponse } from '~/models/IResponse'
import { PaginationParams, PaginationResponse } from '~/models/pagination'
import { Category } from '~/models/entity'

const all = async ({ limit, page }: PaginationParams): Promise<IResponse<PaginationResponse<Category>>> => {
  return await client.get(api.route.category.all, {
    params: {
      limit,
      page
    }
  })
}

const search = async ({ slug, limit, page }: PaginationParams): Promise<IResponse<Category[]>> => {
  return await client.get(api.route.category.search, {
    params: {
      slug,
      limit,
      page
    }
  })
}

export default {
  all,
  search
}
