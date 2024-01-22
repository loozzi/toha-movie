import client from './axios.client'
import api from '.'
import { IResponse } from '~/models/IResponse'
import { PaginationParams, PaginationResponse } from '~/models/pagination'
import { Country } from '~/models/entity'

const all = async ({ limit, page }: PaginationParams): Promise<IResponse<PaginationResponse<Country>>> => {
  return await client.get(api.route.country.all, {
    params: {
      limit,
      page
    }
  })
}

const search = async ({ limit, page, slug }: PaginationParams): Promise<IResponse<PaginationResponse<Country>>> => {
  return await client.get(api.route.country.search, {
    params: {
      limit,
      page,
      slug
    }
  })
}

export default {
  all,
  search
}
