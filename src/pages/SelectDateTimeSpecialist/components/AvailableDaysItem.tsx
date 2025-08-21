import dayjs from 'dayjs'

interface AvailableDaysItemProps {
  date: string
  isSelected: boolean
  isToday: boolean
  onClick: () => void
}

const AvailableDaysItem = ({ date, isSelected, isToday, onClick }: AvailableDaysItemProps) => {
  const day = dayjs(date)

  // Форматирование даты: "12 декабря"
  const formattedDate = day.format('D MMMM')

  // Форматирование дня недели: "ПН"
  const dayOfWeek = day.format('dd').toUpperCase()

  return (
    <div
      className={`min-w-[120px] mr-4
        flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer
        border-2 transition-colors bg-white
        ${isSelected ? 'border-[#018ED7]' : 'border-[#E5E5E5] hover:border-[#018ED7]'}
      `}
      onClick={onClick}>
      <div className="font-medium text-base leading-5 text-[#373741]">{formattedDate}</div>
      <div className="text-sm text-[#7F7E7F]">{dayOfWeek}</div>
      {isToday && <div className="text-xs mt-1 text-[#018ED7]">Сегодня</div>}
    </div>
  )
}

export default AvailableDaysItem
