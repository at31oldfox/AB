import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ISpecialist } from '@store/bookingStore.types'

interface ISpecialistItemProps {
  specialist: ISpecialist
  onSelect: (specialist: ISpecialist) => void
}

const SpecialistItem: React.FC<ISpecialistItemProps> = ({ specialist, onSelect }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`/specialists/${specialist.id}`)
      }}>
      <div className="p-6 flex">
        <div className="flex-shrink-0 mr-4 flex flex-col items-center">
          {specialist.photo ? (
            <img
              src={specialist.photo}
              alt={specialist.name}
              className="w-24 h-24 rounded-full object-cover mb-1"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#F2F9FF] flex items-center justify-center mb-3">
              <span className="text-[#018ED7] text-xl">Фото</span>
            </div>
          )}

          <div className="flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= specialist.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-center text-[#018ED7] text-xs mt-1">
            ({specialist.reviewCount} отзывов)
          </div>
        </div>

        <div className="flex-grow flex flex-col">
          <div className="text-[#7F7E7F] text-base mb-1">{specialist.position}</div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#373741] mb-5">
            {specialist.name}
          </h3>

          {specialist.nearestSlot && (
            <p className="text-sm text-gray-500 mb-3">
              Ближайшая запись с {specialist.nearestSlot}
            </p>
          )}

          <button
            className="px-8 py-2 w-[200px] bg-[#018ED7] text-white rounded-lg hover:bg-[#0070A8] transition-colors font-medium"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onSelect(specialist)
            }}>
            Записаться
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpecialistItem
