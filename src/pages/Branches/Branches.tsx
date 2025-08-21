import { useCallback, useEffect, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import useBookingStore from '@store/bookingStore'
import { IBranch } from '@store/bookingStore.types'

import { useAllBranchesQuery, useCitiesQuery, useCityBranchesQuery } from './Branches.queries'
import BranchList from './components/BranchList'
import CitySelector from './components/CitySelector'

const Branches = () => {
  const navigate = useNavigate()
  const { setBranch, resetBooking, selectedCity, setSelectedCity } = useBookingStore()

  // Запросы данных
  const { cities, isCitiesLoading, isCitiesError } = useCitiesQuery()
  const { allBranches, isAllBranchesLoading, isAllBranchesError } = useAllBranchesQuery(cities)
  const { cityBranches, isCityBranchesLoading, isCityBranchesError } =
    useCityBranchesQuery(selectedCity)

  const handleBranchSelect = useCallback(
    (branch: IBranch) => {
      setBranch(branch)
      navigate('/selection')
    },
    [navigate, setBranch]
  )

  // Обрабатываем успешный результат запроса городов
  useEffect(() => {
    // Если есть только один город, выбираем его автоматически
    if (cities.length === 1) {
      setSelectedCity(cities[0])
    }
  }, [cities, setSelectedCity])

  useEffect(() => {
    resetBooking()
  }, [resetBooking])

  const branchesText = useMemo(() => {
    if (selectedCity) {
      return `Филиалы в городе ${selectedCity}`
    }
    return 'Все филиалы'
  }, [selectedCity])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Записаться на приём онлайн</h1>

      <div className="mb-8">
        {isCitiesError ? (
          <div className="text-red-500 mb-4">
            Произошла ошибка при загрузке списка городов. Пожалуйста, попробуйте позже.
          </div>
        ) : null}

        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          disabled={isCitiesLoading || isCitiesError}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">{branchesText}</h2>

      <BranchList
        selectedCity={selectedCity}
        allBranches={allBranches}
        cityBranches={cityBranches}
        isCitiesLoading={isCitiesLoading}
        isAllBranchesLoading={isAllBranchesLoading}
        isCityBranchesLoading={isCityBranchesLoading}
        isAllBranchesError={isAllBranchesError}
        isCityBranchesError={isCityBranchesError}
        onBranchSelect={handleBranchSelect}
      />
    </div>
  )
}

export default Branches
