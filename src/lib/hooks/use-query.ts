import { useEffect, useState } from 'react'

interface QueryResult<T> {
  data: T | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useQuery<T>(
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  }
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      setError(null)
      const result = await queryFn()
      setData(result)
      options?.onSuccess?.(result)
    } catch (e) {
      const err = e instanceof Error ? e : new Error('未知错误')
      setIsError(true)
      setError(err)
      options?.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData()
    }
  }, [options?.enabled])

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchData,
  }
}
