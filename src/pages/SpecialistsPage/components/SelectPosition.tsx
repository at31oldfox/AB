import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

interface ISelectPositionProps {
  positions: string[]
  selectedPosition: string
  onChange: (position: string) => void
  disabled?: boolean
}

const SelectPosition: React.FC<ISelectPositionProps> = ({
  positions,
  selectedPosition,
  onChange,
  disabled = false
}) => {
  return (
    <div className="w-full relative">
      <Select value={selectedPosition} onValueChange={onChange} disabled={disabled}>
        <div className="relative">
          <SelectTrigger
            className={`w-full h-[44px] bg-white border-[#E5E5E5] rounded-lg focus:ring-0 focus:ring-offset-0 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            <SelectValue placeholder="Выберите должность" />
          </SelectTrigger>
        </div>

        <SelectContent className="bg-white border-[#E5E5E5] rounded-lg">
          {positions.map((position) => (
            <SelectItem
              key={position}
              value={position}
              className="cursor-pointer transition-colors data-[highlighted]:bg-gray-100 data-[selected]:bg-gray-200 data-[selected]:font-medium">
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedPosition && (
        <button
          type="button"
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
          onClick={() => onChange('')}
          disabled={disabled}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SelectPosition
