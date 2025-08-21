import dayjs from 'dayjs'

import AvailableTimeItem from './AvailableTimeItem'

interface AvailableTimeProps {
  selectedDate: string | null
  selectedTime: string | null
  timeSlots: { time: string; available: boolean }[]
  loadingSlots: boolean
  handleTimeSelect: (time: string) => void
}

const AvailableTime = ({
  selectedDate,
  selectedTime,
  timeSlots,
  loadingSlots,
  handleTimeSelect
}: AvailableTimeProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
      <h3 className="text-lg font-medium mb-4">
        {selectedDate
          ? `Доступное время на ${dayjs(selectedDate).format('D MMMM')}`
          : 'Выберите дату для просмотра доступного времени'}
      </h3>

      {loadingSlots ? (
        <div className="text-center py-4">
          <p>Загрузка доступного времени...</p>
        </div>
      ) : selectedDate ? (
        timeSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {timeSlots.map((slot) => (
              <AvailableTimeItem
                key={slot.time}
                time={slot.time}
                available={slot.available}
                isSelected={slot.time === selectedTime}
                onClick={() => handleTimeSelect(slot.time)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p>Нет доступного времени на выбранную дату</p>
          </div>
        )
      ) : (
        <div className="text-center py-4">
          <p>Выберите дату для просмотра доступного времени</p>
        </div>
      )}
    </div>
  )
}

export default AvailableTime
