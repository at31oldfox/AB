import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import updateLocale from 'dayjs/plugin/updateLocale'

import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'

import { useAvailableDatesQuery, useTimeSlotsQuery } from './SelectDateTimeSpecialist.queries'
import AvailableDays, { AvailableDaysRef } from './components/AvailableDays'
import AvailableTime from './components/AvailableTime'
import DatePickerSpecialist, { DatePickerSpecialistRef } from './components/DatePickerSpecialist'

// Инициализация плагинов dayjs
dayjs.extend(updateLocale)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.locale('ru')

const SelectDateTimeSpecialist = () => {
  const navigate = useNavigate()
  const {
    selectedBranch,
    selectedSpecialist,
    selectedServices,
    selectedDate,
    selectedTime,
    setDate,
    setTime
  } = useBookingStore()

  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs())

  // Референсы для компонентов с датами
  const availableDaysRef = useRef<AvailableDaysRef>(null)
  const datePickerRef = useRef<DatePickerSpecialistRef>(null)

  // Получаем сервисные ID для запросов
  const serviceIds = selectedServices.map((s) => s.id)

  // Используем хуки запросов
  const { data: availableDates = [], isLoading: isLoadingDates } = useAvailableDatesQuery(
    selectedBranch?.id,
    selectedSpecialist?.id,
    serviceIds
  )

  const { data: timeSlots = [], isLoading: isLoadingSlots } = useTimeSlotsQuery(
    selectedBranch?.id,
    selectedSpecialist?.id,
    serviceIds,
    selectedDate
  )

  // Проверяем, что все необходимые данные выбраны
  useEffect(() => {
    if (!selectedBranch || !selectedSpecialist || selectedServices.length === 0) {
      navigate('/services')
    }
  }, [selectedBranch, selectedSpecialist, selectedServices, navigate])

  // Устанавливаем начальную дату при загрузке доступных дат
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setDate(availableDates[0])
    }
  }, [availableDates, selectedDate, setDate])

  // Сбрасываем выбранное время, если оно недоступно
  useEffect(() => {
    if (selectedTime && timeSlots.length > 0) {
      const isTimeAvailable = timeSlots.some((slot) => slot.time === selectedTime && slot.available)
      if (!isTimeAvailable) {
        setTime(null)
      }
    }
  }, [timeSlots, selectedTime, setTime])

  // Эффект для синхронизации прокрутки при изменении выбранной даты
  useEffect(() => {
    if (selectedDate) {
      // Прокручиваем доступные даты к выбранной дате
      availableDaysRef.current?.scrollToDate(selectedDate)

      // Прокручиваем календарь к выбранной дате
      datePickerRef.current?.scrollToDate(selectedDate)
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    if (availableDates.includes(formattedDate)) {
      setDate(formattedDate)
    }
  }

  const handleTimeSelect = (time: string) => {
    setTime(time)
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/booking-info')
    }
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

      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Дата и время</h2>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Календарь - фиксированная ширина */}
          <DatePickerSpecialist
            ref={datePickerRef}
            selectedDate={selectedDate}
            availableDates={availableDates}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            handleDateSelect={handleDateSelect}
          />

          {/* Доступные даты и время - растягивается на всю доступную ширину */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Доступные даты */}
            <AvailableDays
              ref={availableDaysRef}
              loading={isLoadingDates}
              availableDates={availableDates}
              selectedDate={selectedDate}
              handleDateSelect={handleDateSelect}
            />

            {/* Доступное время */}
            <AvailableTime
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timeSlots={timeSlots}
              loadingSlots={isLoadingSlots}
              handleTimeSelect={handleTimeSelect}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="px-6 py-3 border border-[#E5E5E5] rounded-lg text-[#373741] hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/specialists')}>
          Назад
        </button>

        <button
          className={`px-6 py-3 rounded-lg transition-colors
            ${
              selectedDate && selectedTime
                ? 'bg-[#018ED7] text-white hover:bg-[#0070A8]'
                : 'bg-[#E5E5E5] text-[#6B6B7B] cursor-not-allowed'
            }`}
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}>
          Продолжить
        </button>
      </div>
    </div>
  )
}

export default SelectDateTimeSpecialist
