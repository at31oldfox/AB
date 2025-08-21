import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'
import { Edit } from 'lucide-react'

interface DateTimeBlockProps {
  selectedDate: string | null
  selectedTime: string | null
}

const DateTimeBlock = ({ selectedDate, selectedTime }: DateTimeBlockProps) => {
  const navigate = useNavigate()

  // Форматирование даты: "14 марта 2025 (понедельник)"
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    return dayjs(dateStr).format('D MMMM YYYY (dddd)')
  }

  return (
    <div className="bg-white p-6 rounded-tl-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Дата и время</h3>
        <button
          className="flex items-center text-[#018ED7] hover:text-[#0070A8]"
          onClick={() => navigate('/datetime-specialist')}>
          <Edit className="h-4 w-4 mr-1" />
          Изменить
        </button>
      </div>
      <div>
        <p className="text-base font-medium">{formatDate(selectedDate)}</p>
        <p className="text-xl font-semibold mt-1">{selectedTime}</p>
      </div>
    </div>
  )
}

export default DateTimeBlock
