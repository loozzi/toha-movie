export interface User {
  id: number
  username: string
  email: string
  balance: number

  [key: string]: any
}

export interface AuthPayload {
  email: string
  password: string
}

export interface RegisterPayload extends AuthPayload {
  username: string
}

export interface UserHistory {
  user_id: number
  movie_id: number
  server_id: number
  episode_name: string
  cur_time: number
  created: string
  modified: string
  is_deleted: number
}
