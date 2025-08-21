import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { IService } from '@/store/bookingStore.types'

import { useSpecialistServicesQuery } from '../SpecialistDetailsPage.queries'
import { ServiceGroup } from './ServiceGroup'

export const ServicesList = () => {
  const { id } = useParams<{ id: string }>()
  const { data: services, isLoading, error } = useSpecialistServicesQuery(id)
  const [groupedServices, setGroupedServices] = useState<Record<string, IService[]>>({})

  useEffect(() => {
    if (services) {
      // Группировка сервисов по категориям
      const grouped = services.reduce<Record<string, IService[]>>((acc, service) => {
        // Используем parentId как категорию, или "Другие услуги" если parentId отсутствует
        const category = service.parentId || 'Другие услуги'

        if (!acc[category]) {
          acc[category] = []
        }

        acc[category].push(service)
        return acc
      }, {})

      setGroupedServices(grouped)
    }
  }, [services])

  if (isLoading) {
    return (
      <div className="py-4 text-center">
        <p>Загрузка услуг...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        <p>Ошибка при загрузке услуг</p>
      </div>
    )
  }

  if (!services || services.length === 0) {
    return (
      <div className="py-4 text-center">
        <p>Услуги не найдены</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
      <h2 className="text-xl font-medium mb-4">Услуги</h2>

      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <ServiceGroup key={category} title={category} services={categoryServices} />
      ))}
    </div>
  )
}
