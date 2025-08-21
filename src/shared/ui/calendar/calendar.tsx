import * as React from 'react'

import { ru } from 'date-fns/locale'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Инициализация русской локали
dayjs.locale('ru')

// Русские названия дней недели (две буквы, первая заглавная)
const weekdayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const Calendar: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  const defaultClassNames = getDefaultClassNames()
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      locale={ru} // Используем русскую локаль для react-day-picker
      weekStartsOn={1} // Неделя начинается с понедельника
      formatters={{
        formatWeekdayName: (date) => {
          const day = date.getDay()
          // Преобразуем индекс дня недели (0 = воскресенье) в индекс для нашего массива (0 = понедельник)
          const adjustedIndex = day === 0 ? 6 : day - 1
          return weekdayLabels[adjustedIndex]
        },
        formatCaption(month) {
          return (
            dayjs(month).format('MMMM YYYY')[0].toUpperCase() +
            dayjs(month).format('MMMM YYYY').slice(1)
          )
        }
      }}
      classNames={{
        root: `${defaultClassNames.root} p-5 border border-[#E5E5E5] rounded-lg`, // Добавляем отступы
        caption_label: 'ml-[10px] text-[18px] font-semibold text-[#373741]', // Стиль для названия месяца и года
        chevron: `h-[18px] w-[18px] fill-[#373741]`, // Цвет стрелок
        selected: `bg-[#018ED7] text-white rounded-full`, // Выделение выбранного дня
        day_selected: 'bg-[#018ED7] text-white hover:bg-[#018ED7] hover:text-white rounded-full',
        day_today: 'text-[#373741] font-semibold',
        day_outside: 'text-[#B2B2B2] opacity-50',
        day_disabled: 'text-[#B2B2B2] opacity-50 cursor-not-allowed hover:bg-transparent',
        day_hidden: 'invisible',
        today: 'text-[#373741] font-semibold',
        nav: 'absolute top-[-5px] right-[5px]',
        ...classNames
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
