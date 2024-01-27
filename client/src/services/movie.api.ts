import client from './axios.client'
import api from '.'
import { PaginationMovieParams, PaginationResponse } from '~/models/pagination'
import { Movie, MovieDetail, MovieServer } from '~/models/movies'
import { IResponse } from '~/models/IResponse'

const getAll = async (params: PaginationMovieParams): Promise<PaginationResponse<Movie>> => {
  return await client.get(api.route.movie.all, {
    params
  })
}

const getDetail = async (slug: string): Promise<IResponse<MovieDetail>> => {
  return await client.get(api.route.movie.detail, {
    params: { slug }
  })
}

const getEpisodes = async (slug: string): Promise<IResponse<MovieServer[]>> => {
  return await client.get(api.route.movie.episodes, {
    params: { slug }
  })
}

export default {
  getAll,
  getDetail,
  getEpisodes
}
