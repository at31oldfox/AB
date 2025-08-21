import { FC, useMemo, useState } from 'react'

import { IService } from '@/store/bookingStore.types'

import ServiceGroup from './ServiceGroup'

export interface IServiceGroupsProps {
  services: IService[]
  searchQuery: string
  selectedServices: IService[]
  onSelect: (service: IService) => void
  onRemove: (serviceId: string) => void
}

export const ServiceGroups: FC<IServiceGroupsProps> = ({
  services,
  searchQuery,
  ...serviceGroupProps
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        newSet.add(groupId)
      }
      return newSet
    })
  }

  // Организуем услуги в иерархическую структуру
  const serviceGroups = services.filter((s) => !s.parentId)
  const childServices = services.filter((s) => s.parentId)

  // Фильтрация по поисковому запросу
  const filteredGroups = useMemo(() => {
    return searchQuery
      ? serviceGroups.filter(
          (group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            childServices
              .filter((service) => service.parentId === group.id)
              .some((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : serviceGroups
  }, [searchQuery, serviceGroups, childServices])

  if (filteredGroups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6B6B7B]">Услуги не найдены</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredGroups.map((group) => (
        <ServiceGroup
          key={group.id}
          {...serviceGroupProps}
          group={group}
          isExpanded={expandedGroups.has(group.id)}
          childServices={childServices.filter((s) => s.parentId === group.id)}
          toggleGroup={toggleGroup}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  )
}
