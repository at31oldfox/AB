import { useNavigate, useParams } from 'react-router-dom'

import { BranchInfo } from '@/shared/components/BranchInfo/BranchInfo'

import useBookingStore from '@store/bookingStore'

import { useSpecialistDetailsQuery } from './SpecialistDetailsPage.queries'
import { CommentsList } from './components/CommentsList'
import { ServicesList } from './components/ServicesList'

const SpecialistDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedBranch, setSpecialist } = useBookingStore()

  const { data: specialist, isLoading, error } = useSpecialistDetailsQuery(id)

  const handleBooking = () => {
    if (specialist) {
      setSpecialist(specialist)
      navigate('/services')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Загрузка информации о специалисте...</p>
        </div>
      </div>
    )
  }

  if (error || !specialist) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p>Специалист не найден</p>
          <button
            className="mt-4 px-4 py-2 bg-[#018ED7] text-white rounded-md hover:bg-[#0070A8] transition-colors"
            onClick={() => navigate('/specialists')}>
            Вернуться к списку специалистов
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[32px] font-medium text-[#373741] mb-6">Записаться на приём онлайн</h1>

      {selectedBranch && <BranchInfo branch={selectedBranch} />}

      <div className="bg-white rounded-t-xl border border-[#E5E5E5] p-6 mb-2">
        <h2 className="text-xl font-medium">{specialist.name}</h2>
      </div>

      <div className="bg-white border border-[#E5E5E5] p-6 mb-2">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[210px]">
            {specialist.photo ? (
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-full md:w-[210px] rounded-xl object-cover"
              />
            ) : (
              <div className="w-full md:w-[210px] aspect-square rounded-ls bg-[#F2F9FF] flex items-center justify-center mx-auto">
                <span className="text-[#018ED7] text-xl">Фото</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-3/4">
            <div className="mb-3 flex flex-row">
              <div className="text-[#7F7E7F] font-medium text-[16px] mr-2">Специальность</div>
              <div className="font-semibold text-[16px]">{specialist.position}</div>
            </div>

            <div className="mb-3 flex flex-row">
              <div className="text-[#7F7E7F] font-medium text-[16px] mr-2">Стаж</div>
              <div className="font-semibold text-[16px]">{specialist.experience}</div>
            </div>

            <div className="mb-3 flex flex-row">
              <div className="text-[#7F7E7F] font-medium text-[16px] mr-2">Клиника</div>
              <div className="font-semibold text-[16px]">{specialist.clinic}</div>
            </div>

            <div className="mb-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= specialist.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#018ED7] text-sm ml-2">
                ({specialist.reviewCount} отзывов)
              </span>
            </div>

            <div className="mb-6">
              <div className="font-semibold text-[16px] mb-2">О специалисте:</div>
              <p className="text-[#373741] text-[16px] font-normal">{specialist.about}</p>
            </div>

            <button
              className="px-8 py-2 bg-[#018ED7] text-white rounded-lg hover:bg-[#0070A8] transition-colors font-medium"
              onClick={handleBooking}>
              Записаться
            </button>
          </div>
        </div>
      </div>

      {specialist.helpsWith.length > 0 && (
        <div className="bg-white border border-[#E5E5E5] p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">С чем поможет</h2>

          {specialist.helpsWith.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-[18px] mb-3">{section.title}</h3>
              <ul className="list-disc pl-4 space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#018ED7]">
                    <span className="text-[16px] font-normal text-[#373741]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <ServicesList />
      <CommentsList />
    </div>
  )
}

export default SpecialistDetailsPage
