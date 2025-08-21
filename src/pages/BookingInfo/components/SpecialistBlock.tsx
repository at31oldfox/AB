import { useNavigate } from 'react-router-dom'

import { Edit } from 'lucide-react'

import { ISpecialist } from '@store/bookingStore.types'

interface SpecialistBlockProps {
  specialist: ISpecialist | null
}

const SpecialistBlock = ({ specialist }: SpecialistBlockProps) => {
  const navigate = useNavigate()

  if (!specialist) return null

  return (
    <div className="bg-white p-6 rounded-tr-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Специалист</h3>
        <button
          className="flex items-center text-[#018ED7] hover:text-[#0070A8]"
          onClick={() => navigate('/specialists')}>
          <Edit className="h-4 w-4 mr-1" />
          Изменить
        </button>
      </div>
      <div className="flex items-center">
        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={specialist.photo}
            alt={specialist.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="text-base font-semibold text-[#7F7E7F]">{specialist.position}</p>
          <p className="text-xl font-semibold">{specialist.name}</p>
        </div>
      </div>
    </div>
  )
}

export default SpecialistBlock
