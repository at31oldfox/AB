import React from 'react'

import { ISpecialist } from '@store/bookingStore.types'

import SpecialistItem from './SpecialistItem'

interface ISpecialistsListProps {
  specialists: ISpecialist[]
  isLoading: boolean
  error: Error | null
  onSelect: (specialist: ISpecialist) => void
}

const SpecialistsList: React.FC<ISpecialistsListProps> = ({
  specialists,
  isLoading,
  error,
  onSelect
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 text-center">
        <div className="w-10 h-10 border-4 border-[#018ED7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#6B6B7B]">Загрузка специалистов...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 text-center text-red-500">
        <p>Произошла ошибка при загрузке специалистов. Пожалуйста, попробуйте позже.</p>
      </div>
    )
  }

  if (specialists.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-[#E5E5E5]">
        <p className="text-[#6B6B7B]">Специалисты не найдены</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-7">
      {specialists.map((specialist) => (
        <SpecialistItem key={specialist.id} specialist={specialist} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default SpecialistsList
