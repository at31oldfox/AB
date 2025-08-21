import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'

import ClientForm from './components/ClientForm'
import DateTimeBlock from './components/DateTimeBlock'
import ServicesBlock from './components/ServicesBlock'
import SpecialistBlock from './components/SpecialistBlock'

const BookingInfoPage = () => {
  const navigate = useNavigate()
  const {
    selectedBranch,
    selectedSpecialist,
    selectedServices,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    clientEmail,
    clientComment
  } = useBookingStore()

  // Проверяем, что все необходимые данные выбраны
  useEffect(() => {
    if (
      !selectedBranch ||
      !selectedSpecialist ||
      selectedServices.length === 0 ||
      !selectedDate ||
      !selectedTime
    ) {
      navigate('/datetime-specialist')
    }
  }, [selectedBranch, selectedSpecialist, selectedServices, selectedDate, selectedTime, navigate])

  const handleSubmitSuccess = () => {
    navigate('/confirmation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Записаться на приём онлайн</h1>

      {selectedBranch && (
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">{selectedBranch.name}</h2>
          <BranchInfo branch={selectedBranch} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Блок с датой и временем */}
        <DateTimeBlock selectedDate={selectedDate} selectedTime={selectedTime} />

        {/* Блок со специалистом */}
        <SpecialistBlock specialist={selectedSpecialist} />

        {/* Блок с выбранными услугами */}
        <ServicesBlock services={selectedServices} />
      </div>

      {/* Блок с информацией о клиенте */}
      <ClientForm
        clientName={clientName}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
        clientComment={clientComment}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </div>
  )
}

export default BookingInfoPage
