import { useQuery } from '@tanstack/react-query'

import { fetchServices } from '@services/api/api'

import { IService } from '@store/bookingStore.types'

export const useServicesQuery = (branchId?: string, specialistId?: string) => {
  return useQuery<IService[], Error>({
    queryKey: ['services', branchId, specialistId],
    queryFn: () => fetchServices(branchId, specialistId),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false
  })
}
