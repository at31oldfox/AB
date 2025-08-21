import { useNavigate } from 'react-router-dom'

import { Edit } from 'lucide-react'

import { IService } from '@store/bookingStore.types'

interface ServicesBlockProps {
  services: IService[]
}

const ServicesBlock = ({ services }: ServicesBlockProps) => {
  const navigate = useNavigate()

  // Расчет общей стоимости услуг
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0)

  return (
    <div className="bg-white p-6 col-span-1 md:col-span-2">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Выбранные услуги</h3>
        <button
          className="flex items-center text-[#018ED7] hover:text-[#0070A8]"
          onClick={() => navigate('/services')}>
          <Edit className="h-4 w-4 mr-1" />
          Изменить
        </button>
      </div>
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-between items-center p-3 border border-[#CCCBCC] rounded-lg">
            <span className="font-medium">{service.name}</span>
            <span className="font-semibold">{service.price} ₽</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <p className="text-lg font-semibold">Итого: {totalPrice} ₽</p>
      </div>
    </div>
  )
}

export default ServicesBlock
