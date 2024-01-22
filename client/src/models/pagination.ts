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
