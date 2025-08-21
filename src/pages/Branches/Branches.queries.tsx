import { useQuery } from '@tanstack/react-query'

import { fetchBranches, fetchCities } from '@services/api'

import { IBranch } from '@store/bookingStore.types'

export const useCitiesQuery = () => {
  const query = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities
  })

  return {
    cities: query.data || [],
    isCitiesLoading: query.isLoading,
    isCitiesError: query.isError,
    citiesError: query.error
  }
}

export const useAllBranchesQuery = (cities: string[]) => {
  const query = useQuery({
    queryKey: ['branches', 'all'],
    queryFn: async () => {
      const allBranchesData: IBranch[] = []
      for (const city of cities) {
        const cityBranches = await fetchBranches(city)
        allBranchesData.push(...cityBranches)
      }
      return allBranchesData
    },
    enabled: cities.length > 0 // Запрос выполняется только если есть города
  })

  return {
    allBranches: query.data || [],
    isAllBranchesLoading: query.isLoading,
    isAllBranchesError: query.isError,
    allBranchesError: query.error
  }
}

export const useCityBranchesQuery = (selectedCity: string) => {
  const query = useQuery({
    queryKey: ['branches', selectedCity],
    queryFn: () => fetchBranches(selectedCity),
    enabled: !!selectedCity // Запрос выполняется только если выбран город
  })

  return {
    cityBranches: query.data || [],
    isCityBranchesLoading: query.isLoading,
    isCityBranchesError: query.isError,
    cityBranchesError: query.error
  }
}
