import { forwardRef, useImperativeHandle, useRef } from 'react'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import AvailableDaysItem from './AvailableDaysItem'

interface AvailableDaysProps {
  loading: boolean
  availableDates: string[]
  selectedDate: string | null
  handleDateSelect: (date: Date) => void
}

export interface AvailableDaysRef {
  scrollToDate: (date: string) => void
}

const AvailableDays = forwardRef<AvailableDaysRef, AvailableDaysProps>(
  ({ loading, availableDates, selectedDate, handleDateSelect }, ref) => {
    // Референс для контейнера дат
    const datesContainerRef = useRef<HTMLDivElement>(null)

    // Экспортируем метод для прокрутки к выбранной дате
    useImperativeHandle(ref, () => ({
      scrollToDate: (date: string) => {
        if (!datesContainerRef.current) return

        // Находим индекс выбранной даты
        const dateIndex = availableDates.findIndex((d) => d === date)
        if (dateIndex === -1) return

        // Находим элемент по индексу
        const element = datesContainerRef.current.children[dateIndex] as HTMLElement
        if (!element) return

        // Прокручиваем к элементу с учетом отступов
        const containerWidth = datesContainerRef.current.clientWidth
        const scrollLeft = element.offsetLeft - containerWidth / 2 + element.offsetWidth / 2

        datesContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }))

    // Функция для прокрутки влево
    const scrollLeft = () => {
      if (datesContainerRef.current) {
        datesContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      }
    }

    // Функция для прокрутки вправо
    const scrollRight = () => {
      if (datesContainerRef.current) {
        datesContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      }
    }

    if (loading) {
      return (
        <div className="text-center py-4">
          <p>Загрузка доступных дат...</p>
        </div>
      )
    }

    if (availableDates.length === 0) {
      return (
        <div className="text-center py-4">
          <p>Нет доступных дат</p>
        </div>
      )
    }

    return (
      <div className="relative w-full overflow-hidden">
        {/* Кнопка прокрутки влево */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                    bg-white border-2 border-[#018ED7] rounded-xl p-2 
                    flex items-center justify-center h-[60px] w-[42px]"
          onClick={scrollLeft}>
          <ChevronLeft className="h-5 w-5 text-[#018ED7]" />
        </button>

        {/* Контейнер с датами */}
        <div
          ref={datesContainerRef}
          className="flex overflow-x-auto ml-14 mr-14 no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
          {availableDates.map((date) => {
            const day = dayjs(date)
            const isSelected = selectedDate === date
            const isToday = day.isSame(dayjs(), 'day')

            return (
              <AvailableDaysItem
                key={date}
                date={date}
                isSelected={isSelected}
                isToday={isToday}
                onClick={() => handleDateSelect(day.toDate())}
              />
            )
          })}
        </div>

        {/* Кнопка прокрутки вправо */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                    bg-white border-2 border-[#018ED7] rounded-xl p-2 
                    flex items-center justify-center h-[60px] w-[42px]"
          onClick={scrollRight}>
          <ChevronRight className="h-5 w-5 text-[#018ED7]" />
        </button>
      </div>
    )
  }
)

AvailableDays.displayName = 'AvailableDays'

export default AvailableDays
