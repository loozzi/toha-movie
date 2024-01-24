import client from './axios.client'
import api from '.'
import { PaginationMovieParams, PaginationResponse } from '~/models/pagination'
import { Movie } from '~/models/movies'

const getAll = async (params: PaginationMovieParams): Promise<PaginationResponse<Movie>> => {
  return await client.get(api.route.movie.all, {
    params
  })
}

export default {
  getAll
}
