import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import ClinicCard from '../components/ClinicCard/ClinicCard'
import { fetchBranches, fetchCities } from '../services/api/api'
import useBookingStore from '../store/bookingStore'
import { IBranch } from '../store/bookingStore.types'
import CitySelector from './Branches/components/CitySelector'

const StartPage = () => {
  const navigate = useNavigate()
  const { setBranch, resetBooking } = useBookingStore()

  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [branches, setBranches] = useState<IBranch[]>([])
  const [loading, setLoading] = useState(true)
  const [allBranches, setAllBranches] = useState<IBranch[]>([])

  // Сбрасываем предыдущие выборы при загрузке страницы
  useEffect(() => {
    resetBooking()
  }, [resetBooking])

  // Загружаем список городов и все филиалы
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities()
        setCities(citiesData)

        // Загружаем все филиалы из всех городов
        const allBranchesData: IBranch[] = []
        for (const city of citiesData) {
          const cityBranches = await fetchBranches(city)
          allBranchesData.push(...cityBranches)
        }
        setAllBranches(allBranchesData)
        setBranches(allBranchesData)
        setLoading(false)

        // Если есть только один город, выбираем его автоматически
        if (citiesData.length === 1) {
          setSelectedCity(citiesData[0])
        }
      } catch (error) {
        // Используем logger вместо console.error
        setLoading(false)
      }
    }

    loadCities()
  }, [])

  // Загружаем филиалы при выборе города
  useEffect(() => {
    const loadBranches = async () => {
      if (!selectedCity) {
        setBranches(allBranches)
        return
      }

      setLoading(true)
      try {
        const branchesData = await fetchBranches(selectedCity)
        setBranches(branchesData)
      } catch (error) {
        // Используем logger вместо console.error
      } finally {
        setLoading(false)
      }
    }

    loadBranches()
  }, [selectedCity, allBranches])

  const handleBranchSelect = (branch: IBranch) => {
    setBranch(branch)
    navigate('/choice')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Записаться на приём онлайн</h1>

      <CitySelector cities={cities} selectedCity={selectedCity} onCityChange={setSelectedCity} />

      <h2 className="text-xl font-semibold mb-4">
        {selectedCity ? `Филиалы в городе ${selectedCity}` : 'Все филиалы'}
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <p>Загрузка филиалов...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <ClinicCard
              key={branch.id}
              clinic={branch}
              onClick={() => handleBranchSelect(branch)}
            />
          ))}
        </div>
      )}

      {branches.length === 0 && !loading && selectedCity && (
        <div className="text-center py-12">
          <p>В выбранном городе нет доступных филиалов</p>
        </div>
      )}
    </div>
  )
}

export default StartPage
