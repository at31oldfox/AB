import { useQuery } from '@tanstack/react-query'

import { fetchSpecialists } from '@services/api/api'

import { ISpecialist } from '@store/bookingStore.types'

export const useSpecialistsQuery = (branchId: string) => {
  return useQuery<ISpecialist[], Error>({
    queryKey: ['specialists', branchId],
    queryFn: () => fetchSpecialists(branchId),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false
  })
}
