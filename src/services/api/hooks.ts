import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { IBranch, IService, ISpecialist, ITimeSlot, ISpecialistDetails } from '@store/bookingStore.types'
import { IBookingData } from './api'
import { API_ENDPOINTS, CACHE_TIMES, GC_TIMES } from './constants'

// Ключи для кэширования
export const queryKeys = {
  cities: ['cities'],
  branches: (city?: string) => ['branches', city],
  specialists: (branchId: string, serviceIds?: string[]) => ['specialists', branchId, serviceIds],
  specialistDetails: (id: string) => ['specialistDetails', id],
  services: (branchId?: string, specialistId?: string) => ['services', branchId, specialistId],
  availableDates: (branchId: string, specialistId: string, serviceIds: string[]) => 
    ['availableDates', branchId, specialistId, serviceIds],
  timeSlots: (branchId: string, specialistId: string, serviceIds: string[], date: string) => 
    ['timeSlots', branchId, specialistId, serviceIds, date]
}

// Хук для получения городов
export const useCities = () => {
  return useQuery({
    queryKey: queryKeys.cities,
    queryFn: async (): Promise<string[]> => {
      const response = await apiClient.get(API_ENDPOINTS.CITIES)
      return response.data
    },
    staleTime: CACHE_TIMES.CITIES,
    gcTime: GC_TIMES.CITIES
  })
}

// Хук для получения филиалов
export const useBranches = (city?: string) => {
  return useQuery({
    queryKey: queryKeys.branches(city),
    queryFn: async (): Promise<IBranch[]> => {
      const params = city ? { city } : {}
      const response = await apiClient.get('/branches', { params })
      return response.data
    },
    enabled: true, // Всегда активен
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })
}

// Хук для получения специалистов
export const useSpecialists = (branchId: string, serviceIds?: string[]) => {
  return useQuery({
    queryKey: queryKeys.specialists(branchId, serviceIds),
    queryFn: async (): Promise<ISpecialist[]> => {
      const params = { branchId, serviceIds: serviceIds?.join(',') }
      const response = await apiClient.get('/specialists', { params })
      return response.data
    },
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })
}

// Хук для получения деталей специалиста
export const useSpecialistDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.specialistDetails(id),
    queryFn: async (): Promise<ISpecialistDetails> => {
      const response = await apiClient.get(`/specialists/${id}/details`)
      return response.data
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000
  })
}

// Хук для получения услуг
export const useServices = (branchId?: string, specialistId?: string) => {
  return useQuery({
    queryKey: queryKeys.services(branchId, specialistId),
    queryFn: async (): Promise<IService[]> => {
      const params = { branchId, specialistId }
      const response = await apiClient.get('/services', { params })
      return response.data
    },
    enabled: true,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000
  })
}

// Хук для получения доступных дат
export const useAvailableDates = (branchId: string, specialistId: string, serviceIds: string[]) => {
  return useQuery({
    queryKey: queryKeys.availableDates(branchId, specialistId, serviceIds),
    queryFn: async (): Promise<string[]> => {
      const params = { branchId, specialistId, serviceIds: serviceIds.join(',') }
      const response = await apiClient.get('/available-dates', { params })
      return response.data
    },
    enabled: !!branchId && !!specialistId && serviceIds.length > 0,
    staleTime: 2 * 60 * 1000, // 2 минуты для дат
    gcTime: 5 * 60 * 1000
  })
}

// Хук для получения временных слотов
export const useTimeSlots = (branchId: string, specialistId: string, serviceIds: string[], date: string) => {
  return useQuery({
    queryKey: queryKeys.timeSlots(branchId, specialistId, serviceIds, date),
    queryFn: async (): Promise<ITimeSlot[]> => {
      const params = { branchId, specialistId, serviceIds: serviceIds.join(','), date }
      const response = await apiClient.get('/time-slots', { params })
      return response.data
    },
    enabled: !!branchId && !!specialistId && serviceIds.length > 0 && !!date,
    staleTime: 1 * 60 * 1000, // 1 минута для слотов
    gcTime: 2 * 60 * 1000
  })
}

// Хук для создания записи
export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (bookingData: IBookingData) => {
      const response = await apiClient.post('/bookings', bookingData)
      return response.data
    },
    onSuccess: () => {
      // Инвалидируем кэш для обновления данных
      queryClient.invalidateQueries({ queryKey: ['availableDates'] })
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
    onError: (error) => {
      console.error('Booking creation failed:', error)
    }
  })
}