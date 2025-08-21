import { FC } from 'react'

import { cn } from '@/shared/utils'
import { IService } from '@/store/bookingStore.types'

export interface IServiceItemProps {
  service: IService
  selected: boolean
  onSelect: (service: IService) => void
  onRemove: (serviceId: string) => void
  className?: string
}

export const ServiceItem: FC<IServiceItemProps> = ({
  service,
  selected,
  onSelect,
  onRemove,
  className
}) => {
  const classes = cn(className, 'flex items-center justify-between p-4 bg-white')

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (selected) {
      onRemove(service.id)
    } else {
      onSelect(service)
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      <span className="block text-[#373741]">{service.name}</span>
      <span className="text-sm text-[#6B6B7B]">{service.duration} мин.</span>
    </div>
  )
}
