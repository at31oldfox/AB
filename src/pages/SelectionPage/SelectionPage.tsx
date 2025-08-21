import { Link, useNavigate } from 'react-router-dom'

import DoctorIcon from '@/components/icons/DoctorIcon'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'

const SelectionPage = () => {
  const navigate = useNavigate()
  const { selectedBranch } = useBookingStore()

  // Проверка наличия выбранного филиала
  if (!selectedBranch) {
    navigate('/')
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Записаться на приём онлайн</h1>

      <BranchInfo branch={selectedBranch} />

      {/* White Background Container */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
        <h3 className="font-medium mb-4">Начать запись</h3>

        <div className="space-y-4 flex flex-col gap-2">
          <Link to="/specialists">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-[#E5E5E5] hover:shadow-md transition-shadow">
              <div className="bg-[#F2F9FF] p-2 rounded-full w-[60px] h-[60px] flex items-center justify-center">
                <DoctorIcon className="text-[#018ED7]" size={30} />
              </div>
              <span>Выбрать специалиста</span>
            </div>
          </Link>

          <Link to="/services">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-[#E5E5E5] hover:shadow-md transition-shadow">
              <div className="bg-[#F2F9FF] p-2 rounded-full w-[60px] h-[60px] flex items-center justify-center">
                <ServiceIcon className="text-[#018ED7]" size={30} />
              </div>
              <span>Выбрать услугу</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SelectionPage
