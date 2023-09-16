export interface Pagination<T> {
  items: T
  page: number
  limit: number
  total: number
}
