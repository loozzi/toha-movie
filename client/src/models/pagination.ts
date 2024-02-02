export interface PaginationR {
  current_page: number
  total_page: number
  total_item: number
  count: number
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: PaginationR
}

export interface PaginationParams {
  limit?: number
  page?: number

  [key: string]: any
}

export type MovieStatus = 'completed' | 'ongoing' | 'trailer' | ''
export type MovieType = 'single' | 'series' | 'hoathinh' | 'tvshows' | ''

export interface PaginationMovieParams extends PaginationParams {
  country_id?: number
  status?: MovieStatus
  year?: number
  category_id?: number
  type?: MovieType
  chieurap?: 0 | 1 | undefined
  keyword?: string
}
