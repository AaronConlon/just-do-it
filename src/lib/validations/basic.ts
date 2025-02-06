export interface IData<T = unknown> {
  data: T
  message?: string
  code: number
}

export type IPaginationData<T = unknown> = IData<{
  list: T[]
  pagination: {
    total: number
    pageSize: number
    current: number
    totalPage: number
  }
}>