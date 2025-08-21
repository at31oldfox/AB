import { useNavigate } from 'react-router-dom'

import useBookingStore from '@/store/bookingStore'

export const NextButton = () => {
  const navigate = useNavigate()
  const { selectedSpecialist, selectedServices } = useBookingStore()

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну услугу')
      return
    }

    if (selectedSpecialist) {
      navigate('/datetime-specialist')
    } else {
      navigate('/specialists')
    }
  }

  return (
    <div className="flex justify-start mt-10">
      <button
        className={`px-6 py-3 rounded-lg transition-colors w-[200px] ${
          selectedServices.length > 0
            ? 'bg-[#018ED7] text-white hover:bg-[#0070A8]'
            : 'bg-[#E5E5E5] text-[#6B6B7B] cursor-not-allowed'
        }`}
        onClick={handleContinue}
        disabled={selectedServices.length === 0}>
        Продолжить
      </button>
    </div>
  )
}
