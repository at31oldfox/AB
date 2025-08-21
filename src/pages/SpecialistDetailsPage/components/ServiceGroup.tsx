import { useState } from 'react'

import { IService } from '@/store/bookingStore.types'

import { ServiceItem } from './ServiceItem'

interface ServiceGroupProps {
  title: string
  services: IService[]
}

export const ServiceGroup = ({ title, services }: ServiceGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mb-4">
      <div
        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
          isExpanded ? 'bg-[#F2F9FF] border border-[#E1F4FF]' : 'bg-white border border-[#E5E5E5]'
        }`}
        onClick={toggleExpand}>
        <span className="font-medium text-[#373741]">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform text-[#018ED7] ${isExpanded ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <div className="border-l border-r border-b border-[#E5E5E5] rounded-b-lg overflow-hidden">
          {services.map((service, index) => (
            <ServiceItem
              className={`${index !== services.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
              key={service.id}
              service={service}
            />
          ))}
        </div>
      )}
    </div>
  )
}
