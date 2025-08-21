import { useNavigate } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { createBooking } from '@services/api/api'

import useBookingStore from '@store/bookingStore'

interface ClientFormProps {
  clientName: string
  clientPhone: string
  clientEmail: string
  clientComment: string
  onSubmitSuccess: () => void
}

interface FormData {
  name: string
  phone: string
  email: string
  comment: string
  acceptTerms: boolean
}

const ClientForm = ({
  clientName,
  clientPhone,
  clientEmail,
  clientComment,
  onSubmitSuccess
}: ClientFormProps) => {
  const navigate = useNavigate()
  const {
    selectedBranch,
    selectedSpecialist,
    selectedServices,
    selectedDate,
    selectedTime,
    setClientInfo
  } = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      comment: clientComment,
      acceptTerms: false
    }
  })

  const onSubmit = async (data: FormData) => {
    if (!selectedBranch || !selectedSpecialist || !selectedDate || !selectedTime) {
      return
    }

    setClientInfo(data.name, data.phone, data.email, data.comment)

    try {
      const bookingData = {
        branchId: selectedBranch.id,
        specialistId: selectedSpecialist.id,
        serviceIds: selectedServices.map((s) => s.id),
        date: selectedDate,
        time: selectedTime,
        clientName: data.name,
        clientPhone: data.phone,
        clientEmail: data.email,
        clientComment: data.comment
      }

      const result = await createBooking(bookingData)

      if (result.success) {
        onSubmitSuccess()
      } else {
        // Если слот уже занят, показываем сообщение и перенаправляем на выбор времени
        if (result.message === 'Дата и время уже заняты') {
          alert(result.message)
          navigate('/datetime-specialist')
        } else {
          alert(`Ошибка при создании записи: ${result.message}`)
        }
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Произошла ошибка при создании записи')
    }
  }

  return (
    <div className="bg-white p-6 rounded-b-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Клиент</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Левая колонка формы */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Имя*"
                className={`w-full h-[40px] px-4 border border-[#CCCBCC] rounded-[10px] focus:outline-none focus:border-[#018ED7] ${
                  errors.name ? 'border-red-500' : ''
                }`}
                {...register('name', { required: 'Введите ваше имя' })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Телефон*"
                className={`w-full h-[40px] px-4 border border-[#CCCBCC] rounded-[10px] focus:outline-none focus:border-[#018ED7] ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                {...register('phone', {
                  required: 'Введите ваш телефон',
                  pattern: {
                    value: /^\+7\d{10}$/,
                    message: 'Телефон должен быть в формате +7XXXXXXXXXX'
                  }
                })}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full h-[40px] px-4 border border-[#CCCBCC] rounded-[10px] focus:outline-none focus:border-[#018ED7]"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Некорректный email адрес'
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Правая колонка формы */}
          <div>
            <textarea
              placeholder="Комментарий"
              className="w-full h-full min-h-[120px] p-4 border border-[#CCCBCC] rounded-[10px] focus:outline-none focus:border-[#018ED7] resize-none"
              {...register('comment')}
            />
          </div>
        </div>

        {/* Чекбокс согласия */}
        <div className="mt-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-[#018ED7] border-[#CCCBCC] rounded focus:ring-[#018ED7]"
              {...register('acceptTerms', { required: 'Необходимо принять условия' })}
            />
            <span className="ml-2 text-sm">
              Я принимаю{' '}
              <a href="#" className="text-[#018ED7] hover:underline">
                условия пользовательского соглашения
              </a>{' '}
              и даю согласие на{' '}
              <a href="#" className="text-[#018ED7] hover:underline">
                обработку персональных данных
              </a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Кнопки */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            className="flex items-center px-6 py-3 border border-[#E5E5E5] rounded-lg text-[#373741] hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/datetime-specialist')}
            disabled={isSubmitting}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Назад
          </button>

          <button
            type="submit"
            className={`px-6 py-3 rounded-lg transition-colors ${
              isSubmitting
                ? 'bg-[#E5E5E5] text-[#6B6B7B] cursor-not-allowed'
                : 'bg-[#018ED7] text-white hover:bg-[#0070A8]'
            }`}
            disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Записаться'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm
