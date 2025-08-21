import { FC } from 'react'

import { Clock, MapPin, Phone } from 'lucide-react'

import { IBranch } from '@/store/bookingStore.types'

export interface IBranchInfoProps {
  branch: IBranch
}

export const BranchInfo: FC<IBranchInfoProps> = ({ branch }) => {
  return (
    <div className="mb-6">
      <div className="inline-block text-xl font-medium mb-4">
        {branch.district || 'Ленинградский'}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm bg-white border border-[#E5E5E5] rounded-full px-4 py-2">
          <MapPin size={18} className="text-[#018ED7]" />
          <span className="text-[16px] text-[#373741]">
            {branch.address || 'г. Кемерово, ул. Полевая, 16'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm bg-white border border-[#E5E5E5] rounded-full px-4 py-2">
          <Phone size={18} className="text-[#018ED7]" />
          <span className="text-[16px] text-[#373741]">{branch.phone || '+7 (926)-250-25-96'}</span>
        </div>

        <div className="flex items-center gap-2 text-sm bg-white border border-[#E5E5E5] rounded-full px-4 py-2">
          <Clock size={18} className="text-[#018ED7]" />
          <span className="text-[16px] text-[#373741]">{branch.hours || '09:00 - 20:00'}</span>
        </div>
      </div>
    </div>
  )
}
