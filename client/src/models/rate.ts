export interface RateResponse {
  total: number
  score: number
  user: number
}

export interface RateRequest {
  movie_id: number
  score: number
}
