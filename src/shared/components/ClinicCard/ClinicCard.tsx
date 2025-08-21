import { FC } from 'react'

import { Clock, MapPin, Phone } from 'lucide-react'

import { IBranch } from '@store/bookingStore.types'

export interface IClinicCardProps {
  clinic: IBranch
  onClick?: () => void
}

export const ClinicCard: FC<IClinicCardProps> = ({ clinic, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#cccbcc] max-w-[440px] cursor-pointer"
      onClick={onClick}>
      <div className="h-32 relative">
        <div className="h-32 overflow-hidden p-2">
          <img
            src={clinic.image || 'https://via.placeholder.com/400x200?text=Клиника'}
            alt={clinic.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[#373741] font-medium text-lg mb-2">{clinic.name}</h3>

        <div className="flex items-start gap-2 mb-2 text-[#7f7e7f]">
          <MapPin className="h-5 w-5 text-[#018ed7] shrink-0 mt-0.5" />
          <span className="text-base text-[#373741]">{clinic.address}</span>
        </div>

        <div className="flex items-center gap-2 mb-2 text-[#7f7e7f]">
          <Phone className="h-5 w-5 text-[#018ed7] shrink-0" />
          <span className="text-base text-[#373741]">{clinic.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-[#7f7e7f]">
          <Clock className="h-5 w-5 text-[#018ed7] shrink-0" />
          <span className="text-base text-[#373741]">{clinic.workingHours}</span>
        </div>
      </div>
    </div>
  )
}

export default ClinicCard
