export interface Pagination {
  current_page: number
  total_page: number
  total_item: number
  count: number
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: Pagination
}

export interface PaginationParams {
  limit?: number
  page?: number

  [key: string]: any
}

export interface PaginationMovieParams extends PaginationParams {
  country_id?: number
  status?: 'completed' | 'ongoing' | 'trailer' | ''
  year?: number
  category?: number
  type?: 'single' | 'series' | 'hoathinh' | 'tvshows' | ''
  chieurap?: 0 | 1 | undefined
}
