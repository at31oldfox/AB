import React from 'react'

import { IService } from '@store/bookingStore.types'

import { ServiceItem } from './ServiceItem'

export interface IServiceGroupProps {
  group: IService
  isExpanded: boolean
  searchQuery: string
  childServices: IService[]
  selectedServices: IService[]
  toggleGroup: (groupId: string) => void
  onSelect: (service: IService) => void
  onRemove: (serviceId: string) => void
}

const ServiceGroup: React.FC<IServiceGroupProps> = ({
  group,
  isExpanded,
  searchQuery,
  childServices,
  selectedServices,
  toggleGroup,
  onSelect,
  onRemove
}) => {
  // Фильтрация дочерних услуг по поисковому запросу
  const filteredChildren = searchQuery
    ? childServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : childServices

  // Если нет дочерних услуг после фильтрации, не показываем группу
  if (searchQuery && filteredChildren.length === 0) {
    return null
  }

  return (
    <div className="mb-4">
      <div
        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
          isExpanded ? 'bg-[#F2F9FF] border border-[#E1F4FF]' : 'bg-white border border-[#E5E5E5]'
        }`}
        onClick={() => toggleGroup(group.id)}>
        <span className="font-medium text-[#373741]">{group.name}</span>
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
          {filteredChildren.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              className={`${
                index !== filteredChildren.length - 1 ? 'border-b border-[#E5E5E5]' : ''
              }`}
              selected={selectedServices.some((s) => s.id === service.id)}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceGroup
