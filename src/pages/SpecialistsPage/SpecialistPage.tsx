import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'
import { ISpecialist } from '@store/bookingStore.types'

import { useSpecialistsQuery } from './SpecialistPage.queries'
import SelectPosition from './components/SelectPosition'
import SelectSpecialist from './components/SelectSpecialist'
import SpecialistsList from './components/SpecialistsList'

const SpecialistPage = () => {
  const navigate = useNavigate()
  const { selectedBranch, setSpecialist } = useBookingStore()
  const [selectedPosition, setSelectedPosition] = useState<string>('')
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('')
  const [filteredSpecialists, setFilteredSpecialists] = useState<ISpecialist[]>([])

  const [availablePositions, setAvailablePositions] = useState<string[]>([])

  // Перенаправление, если не выбран филиал
  if (!selectedBranch) {
    navigate('/')
    return null
  }

  const { data: specialists = [], isLoading, error } = useSpecialistsQuery(selectedBranch.id)

  useEffect(() => {
    if (specialists.length) {
      setFilteredSpecialists(specialists)
      setAvailablePositions(Array.from(new Set(specialists.map((s) => s.position))))
    }
  }, [specialists])

  // Обработчик изменения должности
  const handlePositionChange = (position: string) => {
    setSelectedPosition(position)

    if (position) {
      setSelectedSpecialistId('')
      setFilteredSpecialists(specialists.filter((s) => s.position === position))
    } else {
      setSelectedSpecialistId('')
      setFilteredSpecialists(specialists)
    }
  }

  // Обработчик изменения специалиста
  const handleSpecialistChange = (specialistId: string) => {
    setSelectedSpecialistId(specialistId)

    if (specialistId) {
      const selectedSpecialist = specialists.find((s) => s.id === specialistId)
      setFilteredSpecialists(specialists.filter((s) => s.id === selectedSpecialist?.id))
    } else if (selectedPosition) {
      setFilteredSpecialists(specialists.filter((s) => s.position === selectedPosition))
    } else {
      setFilteredSpecialists(specialists)
    }
  }

  const handleSpecialistSelect = (specialist: ISpecialist) => {
    setSpecialist(specialist)
    navigate('/services')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Записаться на приём онлайн</h1>

      {selectedBranch && <BranchInfo branch={selectedBranch} />}

      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 mb-6">
        <h3 className="font-medium mb-4">Специалист</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[360px]">
            <SelectPosition
              positions={availablePositions}
              selectedPosition={selectedPosition}
              onChange={handlePositionChange}
              disabled={isLoading}
            />
          </div>

          <div className="w-full md:w-[360px]">
            <SelectSpecialist
              specialists={selectedPosition ? filteredSpecialists : specialists}
              selectedSpecialistId={selectedSpecialistId}
              onChange={handleSpecialistChange}
              disabled={isLoading}
            />
          </div>
        </div>
        <SpecialistsList
          specialists={filteredSpecialists}
          isLoading={isLoading}
          error={error}
          onSelect={handleSpecialistSelect}
        />
      </div>
    </div>
  )
}

export default SpecialistPage
