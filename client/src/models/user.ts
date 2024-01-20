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
