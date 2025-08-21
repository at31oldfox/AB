import { useQuery } from '@tanstack/react-query'

import { fetchAvailableDates, fetchTimeSlots } from '@services/api/api'

// Хук для получения доступных дат
export const useAvailableDatesQuery = (
  branchId: string | undefined,
  specialistId: string | undefined,
  serviceIds: string[]
) => {
  return useQuery({
    queryKey: ['availableDates', branchId, specialistId, serviceIds],
    queryFn: () => {
      if (!branchId || !specialistId || serviceIds.length === 0) {
        return Promise.resolve([])
      }
      return fetchAvailableDates(branchId, specialistId, serviceIds)
    },
    enabled: !!branchId && !!specialistId && serviceIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false
  })
}

// Хук для получения доступных временных слотов
export const useTimeSlotsQuery = (
  branchId: string | undefined,
  specialistId: string | undefined,
  serviceIds: string[],
  date: string | null
) => {
  return useQuery({
    queryKey: ['timeSlots', branchId, specialistId, serviceIds, date],
    queryFn: () => {
      if (!branchId || !specialistId || serviceIds.length === 0 || !date) {
        return Promise.resolve([])
      }
      return fetchTimeSlots(branchId, specialistId, serviceIds, date)
    },
    enabled: !!branchId && !!specialistId && serviceIds.length > 0 && !!date,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false
  })
}
