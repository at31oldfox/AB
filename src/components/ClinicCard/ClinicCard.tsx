import React from 'react'

import { IBranch } from '../../store/bookingStore.types'

interface ClinicCardProps {
  clinic: IBranch
  onClick: () => void
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, onClick }) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}>
      {clinic.image && (
        <div className="mb-3 h-40 overflow-hidden rounded-md">
          <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{clinic.name}</h3>
      {clinic.address && <p className="text-gray-600 mb-1">{clinic.address}</p>}
      {clinic.phone && <p className="text-gray-600 mb-1">{clinic.phone}</p>}
      {clinic.workingHours && (
        <p className="text-gray-600 mb-1">Часы работы: {clinic.workingHours}</p>
      )}
    </div>
  )
}

export default ClinicCard
