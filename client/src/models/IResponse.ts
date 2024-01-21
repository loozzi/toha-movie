export interface IResponse<T> {
  status: number
  message: string
  elements?: T
}
