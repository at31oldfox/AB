import { Dispatch, SetStateAction, forwardRef, useImperativeHandle } from 'react'

import dayjs from 'dayjs'

import { Calendar } from '@/shared/ui/calendar/calendar'

interface DatePickerSpecialistProps {
  selectedDate: string | null
  availableDates: string[]
  currentMonth: dayjs.Dayjs
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>
  handleDateSelect: (date: Date) => void
}

export interface DatePickerSpecialistRef {
  scrollToDate: (date: string) => void
}

const DatePickerSpecialist = forwardRef<DatePickerSpecialistRef, DatePickerSpecialistProps>(
  ({ selectedDate, availableDates, currentMonth, setCurrentMonth, handleDateSelect }, ref) => {
    // Функция для определения доступных дат для календаря
    const isDateAvailable = (date: Date) => {
      const formattedDate = dayjs(date).format('YYYY-MM-DD')
      return availableDates.includes(formattedDate)
    }

    // Функция для определения выбранной даты
    const isDateSelected = (date: Date) => {
      if (!selectedDate) return false
      return dayjs(date).format('YYYY-MM-DD') === selectedDate
    }

    // Экспортируем метод для прокрутки к выбранной дате
    useImperativeHandle(ref, () => ({
      scrollToDate: (date: string) => {
        const dateObj = dayjs(date)
        // Если выбранная дата не в текущем месяце, меняем месяц
        if (dateObj.month() !== currentMonth.month() || dateObj.year() !== currentMonth.year()) {
          setCurrentMonth(dateObj)
        }
      }
    }))

    return (
      <div className="flex-shrink-0 w-full md:w-[350px]">
        <Calendar
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={(date) => date && handleDateSelect(date)}
          disabled={[
            { before: new Date() }, // Даты до сегодня
            (date) => !isDateAvailable(date) // Недоступные даты
          ]}
          modifiers={{
            selected: (date) => isDateSelected(date)
          }}
          month={currentMonth.toDate()}
          onMonthChange={(month) => setCurrentMonth(dayjs(month))}
        />
      </div>
    )
  }
)

DatePickerSpecialist.displayName = 'DatePickerSpecialist'

export default DatePickerSpecialist
