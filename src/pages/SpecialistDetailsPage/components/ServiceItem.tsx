import { FC } from 'react'

import { cn } from '@/shared/utils'
import { IService } from '@/store/bookingStore.types'

interface ServiceItemProps {
  service: IService
  className?: string
}

export const ServiceItem: FC<ServiceItemProps> = ({ service, className }) => {
  const classes = cn(className, 'flex items-center justify-between p-4 bg-white')

  return (
    <div className={classes}>
      <span className="block text-[#373741]">{service.name}</span>
      <span className="text-sm text-[#6B6B7B]">{service.duration} мин.</span>
    </div>
  )
}
