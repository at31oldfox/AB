import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import PricelistIcon from '@/components/icons/PricelilstIcon'
import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'

import { useServicesQuery } from './ServicesPage.queries'
import { NextButton } from './components/NextButton'
import { SelectedService } from './components/SelectedService'
import { ServiceGroups } from './components/ServiceGroups'
import ServicesSearch from './components/ServicesSearch'

const ServicesPage = () => {
  const navigate = useNavigate()
  const { selectedBranch, selectedSpecialist, selectedServices, addService, removeService } =
    useBookingStore()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const {
    data: services = [],
    isLoading,
    error
  } = useServicesQuery(selectedBranch?.id, selectedSpecialist?.id)

  // Перенаправление, если не выбран филиал
  if (!selectedBranch) {
    navigate('/')
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Записаться на приём онлайн</h1>

      {selectedBranch && <BranchInfo branch={selectedBranch} />}

      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Услуги</h3>
          <a
            href="#"
            className="flex items-center text-[#018ED7] hover:text-[#0070A8] text-sm"
            target="_blank"
            rel="noopener noreferrer">
            <PricelistIcon className="text-[#018ED7] mr-2" size={20} />
            <span>Прайс-лист</span>
          </a>
        </div>
      </div>

      <ServicesSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {isLoading ? (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 text-center">
          <div className="w-10 h-10 border-4 border-[#018ED7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B6B7B]">Загрузка услуг...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 text-center text-red-500">
          <p>Произошла ошибка при загрузке услуг. Пожалуйста, попробуйте позже.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 mb-6">
          {selectedServices.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedServices.map((service) => (
                <SelectedService key={service.id} service={service} removeService={removeService} />
              ))}
            </div>
          )}

          <ServiceGroups
            services={services}
            searchQuery={searchQuery}
            selectedServices={selectedServices}
            onSelect={addService}
            onRemove={removeService}
          />

          <NextButton />
        </div>
      )}
    </div>
  )
}

export default ServicesPage
