// hooks/useAppointments.ts
import { Appointment } from '@/types/appointment-type'
import { useEffect, useState } from 'react'

interface UseAppointmentsParams {
  page: number
  pageSize: number
}

interface UseAppointmentsReturn {
  data: Appointment[]
  totalPages: number
  totalCount: number
  isLoading: boolean
  error?: string
}

export function useFetchAppointments({ page, pageSize }: UseAppointmentsParams): UseAppointmentsReturn {
  const [data, setData] = useState<Appointment[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)

    const controller = new AbortController()

    fetch(`/api/appointment?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      signal: controller.signal,
      next: { revalidate: 120 }, // 2 minutes
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json.data)
        setTotalPages(json.totalPages)
        setTotalCount(json.totalCount)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [page, pageSize])

  return { data, totalPages, totalCount, isLoading, error }
}
