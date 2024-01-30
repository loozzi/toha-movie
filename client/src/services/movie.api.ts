import client from './axios.client'
import api from '.'
import { PaginationMovieParams, PaginationResponse } from '~/models/pagination'
import { Movie, MovieDetail, MovieServer } from '~/models/movies'
import { IResponse } from '~/models/IResponse'
import { RateRequest } from '~/models/rate'

const getAll = async (params: PaginationMovieParams): Promise<PaginationResponse<Movie>> => {
  return await client.get(api.route.movie.all, {
    params
  })
}

const getDetail = async (props: { slug: string; user_id?: number }): Promise<IResponse<MovieDetail>> => {
  const { slug, user_id } = props
  return await client.get(api.route.movie.detail, {
    params: { slug, user_id }
  })
}

const getEpisodes = async (slug: string): Promise<IResponse<MovieServer[]>> => {
  return await client.get(api.route.movie.episodes, {
    params: { slug }
  })
}

const rate = async (data: RateRequest): Promise<IResponse<undefined>> => {
  return await client.post(api.route.movie.rate, data)
}

export default {
  getAll,
  getDetail,
  getEpisodes,
  rate
}
