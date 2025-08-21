import { FC } from 'react'

import { IService } from '@/store/bookingStore.types'

export interface ISelectedServiceProps {
  service: IService
  removeService: (id: string) => void
}

export const SelectedService: FC<ISelectedServiceProps> = ({ service, removeService }) => {
  return (
    <div
      key={service.id}
      className="flex items-center gap-2 px-3 py-2 bg-[#FFF9E6] border border-[#FFEDB3] rounded-full">
      <span className="text-sm text-[#373741]">{service.name}</span>
      <span className="text-xs text-[#6B6B7B]">{service.duration} мин.</span>
      <button
        className="ml-1 text-[#6B6B7B] hover:text-red-500"
        onClick={() => removeService(service.id)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
