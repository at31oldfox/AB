import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import updateLocale from 'dayjs/plugin/updateLocale'

import { fetchAvailableDates, fetchTimeSlots } from '../services/api/api'
import useBookingStore from '../store/bookingStore'

// Инициализация плагинов dayjs
dayjs.extend(updateLocale)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.locale('ru')

const DateTimePage = () => {
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

  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean }[]>([])
  const [_currentMonth, _setCurrentMonth] = useState<dayjs.Dayjs>(dayjs())
  const [visibleDays, setVisibleDays] = useState<dayjs.Dayjs[]>([])
  const [_loading, setLoading] = useState(true)
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (!selectedBranch || !selectedSpecialist || selectedServices.length === 0) {
      navigate('/service')
      return
    }

    const loadAvailableDates = async () => {
      try {
        setLoading(true)
        const datesData = await fetchAvailableDates(
          selectedBranch.id,
          selectedSpecialist.id,
          selectedServices.map((s) => s.id)
        )
        setAvailableDates(datesData)

        // Если есть сохраненная дата, используем ее, иначе берем первую доступную
        const initialDate = selectedDate || (datesData.length > 0 ? datesData[0] : null)
        if (initialDate) {
          setDate(initialDate)
          loadTimeSlots(initialDate)
        }

        // Устанавливаем видимые дни начиная с текущей даты
        updateVisibleDays(dayjs())
      } catch (error) {
        console.error('Error loading available dates:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAvailableDates()
  }, [selectedBranch, selectedSpecialist, selectedServices, navigate, setDate])

  const loadTimeSlots = async (date: string) => {
    if (!selectedBranch || !selectedSpecialist) return

    try {
      setLoadingSlots(true)
      const timeSlotsData = await fetchTimeSlots(
        selectedBranch.id,
        selectedSpecialist.id,
        selectedServices.map((s) => s.id),
        date
      )
      setTimeSlots(timeSlotsData)

      // Если выбранное время недоступно, сбрасываем его
      if (
        selectedTime &&
        !timeSlotsData.find((slot) => slot.time === selectedTime && slot.available)
      ) {
        setTime(null)
      }
    } catch (error) {
      console.error('Error loading time slots:', error)
    } finally {
      setLoadingSlots(false)
    }
  }

  const updateVisibleDays = (startDate: dayjs.Dayjs) => {
    const days: dayjs.Dayjs[] = []
    for (let i = 0; i < 3; i++) {
      days.push(startDate.add(i, 'day'))
    }
    setVisibleDays(days)
  }

  const handlePrevDays = () => {
    if (visibleDays.length > 0) {
      const firstDay = visibleDays[0]
      const newStartDate = firstDay.subtract(3, 'day')

      // Не показываем даты раньше текущей
      if (newStartDate.isBefore(dayjs(), 'day')) {
        updateVisibleDays(dayjs())
      } else {
        updateVisibleDays(newStartDate)
      }
    }
  }

  const handleNextDays = () => {
    if (visibleDays.length > 0) {
      const lastDay = visibleDays[visibleDays.length - 1]
      const newStartDate = lastDay.add(1, 'day')

      // Не показываем даты позже 30 дней от текущей
      const maxDate = dayjs().add(30, 'day')
      if (newStartDate.isAfter(maxDate, 'day')) {
        return
      }

      updateVisibleDays(newStartDate)
    }
  }

  const handleDateSelect = (day: dayjs.Dayjs) => {
    const dateStr = day.format('YYYY-MM-DD')
    setDate(dateStr)
    loadTimeSlots(dateStr)
  }

  const handleTimeSelect = (time: string) => {
    setTime(time)
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/booking-info')
    }
  }

  const isDateAvailable = (date: dayjs.Dayjs): boolean => {
    const dateStr = date.format('YYYY-MM-DD')
    return availableDates.includes(dateStr)
  }

  const formatDayOfWeek = (date: dayjs.Dayjs): string => {
    return date.format('dd')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Выбор даты и времени</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Выберите дату</h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md border hover:bg-gray-50" onClick={handlePrevDays}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-md border hover:bg-gray-50" onClick={handleNextDays}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-2">
                {visibleDays.map((day) => {
                  const isAvailable = isDateAvailable(day)
                  const isSelected = selectedDate === day.format('YYYY-MM-DD')
                  const isToday = day.isSame(dayjs(), 'day')

                  return (
                    <div
                      key={day.format('YYYY-MM-DD')}
                      className={`
                        text-center p-3 rounded-md cursor-pointer
                        ${isToday ? 'border-blue-500 border-2' : 'border'}
                        ${isSelected ? 'bg-blue-600 text-white' : ''}
                        ${!isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
                      `}
                      onClick={() => isAvailable && handleDateSelect(day)}>
                      <div className="text-xs mb-1">{formatDayOfWeek(day)}</div>
                      <div className="font-medium">{day.format('D')}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">
            {selectedDate
              ? `Доступное время на ${dayjs(selectedDate).format('D MMMM')}`
              : 'Выберите дату для просмотра доступного времени'}
          </h2>

          {loadingSlots ? (
            <div className="text-center py-10">
              <p>Загрузка доступного времени...</p>
            </div>
          ) : selectedDate ? (
            timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.time}
                    className={`text-center p-2 rounded-md cursor-pointer ${
                      !slot.available
                        ? 'text-gray-300 cursor-not-allowed'
                        : slot.time === selectedTime
                          ? 'bg-blue-600 text-white'
                          : 'border hover:bg-blue-100'
                    }`}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}>
                    {slot.time}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Нет доступного времени на выбранную дату</p>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <p>Выберите дату для просмотра доступного времени</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/service')}>
          Назад
        </button>

        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            selectedDate && selectedTime
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}>
          Продолжить
        </button>
      </div>
    </div>
  )
}

export default DateTimePage
