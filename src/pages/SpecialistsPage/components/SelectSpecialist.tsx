import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

import { ISpecialist } from '@store/bookingStore.types'

interface ISelectSpecialistProps {
  specialists: ISpecialist[]
  selectedSpecialistId: string
  onChange: (specialistId: string) => void
  disabled?: boolean
}

const SelectSpecialist: React.FC<ISelectSpecialistProps> = ({
  specialists,
  selectedSpecialistId,
  onChange,
  disabled = false
}) => {
  return (
    <div className="w-full relative">
      <Select value={selectedSpecialistId} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full h-[44px] bg-white border-[#E5E5E5] rounded-lg focus:ring-0 focus:ring-offset-0 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          <SelectValue placeholder="Выберите специалиста" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#E5E5E5] rounded-lg">
          {specialists.map((specialist) => (
            <SelectItem
              key={specialist.id}
              value={specialist.id}
              className="cursor-pointer transition-colors data-[highlighted]:bg-gray-100 data-[selected]:bg-gray-200 data-[selected]:font-medium">
              {specialist.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedSpecialistId && (
        <button
          type="button"
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation()
            onChange('')
          }}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SelectSpecialist
