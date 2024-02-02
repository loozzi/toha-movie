import { IResponse } from '~/models/IResponse'
import { Movie, MovieDetail, MovieHomePage, MovieServer } from '~/models/movies'
import { PaginationMovieParams, PaginationResponse } from '~/models/pagination'
import { RateRequest } from '~/models/rate'
import api from '.'
import client from './axios.client'

const getAll = async (params: PaginationMovieParams): Promise<PaginationResponse<Movie>> => {
  return await client.get(api.route.movie.all, {
    params
  })
}

const getHome = async (): Promise<IResponse<MovieHomePage>> => {
  return await client.get(api.route.movie.home)
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
  getHome,
  getDetail,
  getEpisodes,
  rate
}
