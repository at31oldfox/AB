import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import useBookingStore from '../store/bookingStore'

// Устанавливаем русскую локаль
dayjs.locale('ru')

const ConfirmationPage = () => {
  const navigate = useNavigate()
  const {
    selectedBranch,
    selectedSpecialist,
    selectedServices,
    selectedDate,
    selectedTime,
    clientName,
    resetBooking
  } = useBookingStore()

  if (
    !selectedBranch ||
    !selectedSpecialist ||
    selectedServices.length === 0 ||
    !selectedDate ||
    !selectedTime
  ) {
    navigate('/')
    return null
  }

  const handleReturnToSite = () => {
    // Здесь можно добавить редирект на основной сайт
    window.location.href = 'https://example.com'
  }

  const handleBookAgain = () => {
    resetBooking()
    navigate('/')
  }

  const formatDate = (dateStr: string) => {
    return dayjs(dateStr).format('D MMMM YYYY')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Запись создана</h1>

        <p className="text-lg text-gray-600 mb-6">
          {clientName}, администратор свяжется с Вами для подтверждения и уточнения деталей.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 inline-block mx-auto">
          <div className="text-left">
            <p className="mb-2">
              <span className="font-medium">Дата и время:</span> {formatDate(selectedDate)},{' '}
              {selectedTime}
            </p>
            <p className="mb-2">
              <span className="font-medium">Специалист:</span> {selectedSpecialist.name}
            </p>
            <p className="mb-2">
              <span className="font-medium">Услуги:</span>{' '}
              {selectedServices.map((s) => s.name).join(', ')}
            </p>
            <p>
              <span className="font-medium">Филиал:</span> {selectedBranch.name},{' '}
              {selectedBranch.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleReturnToSite}
          >
            Вернуться на сайт
          </button>

          <button
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            onClick={handleBookAgain}
          >
            Записаться еще
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage
