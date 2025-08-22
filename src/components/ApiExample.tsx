import React, { useState } from 'react'
import { 
  useCities, 
  useBranches, 
  useSpecialists, 
  useServices, 
  useCreateBooking,
  isMocksEnabled 
} from '@services/api'

export const ApiExample: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedBranchId, setSelectedBranchId] = useState<string>('')
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('')

  // React Query хуки
  const { data: cities, isLoading: citiesLoading, error: citiesError } = useCities()
  const { data: branches, isLoading: branchesLoading } = useBranches(selectedCity)
  const { data: specialists, isLoading: specialistsLoading } = useSpecialists(selectedBranchId)
  const { data: services, isLoading: servicesLoading } = useServices(selectedBranchId, selectedSpecialistId)
  const createBookingMutation = useCreateBooking()

  const handleBooking = () => {
    if (!selectedBranchId || !selectedSpecialistId) {
      alert('Выберите филиал и специалиста')
      return
    }

    createBookingMutation.mutate({
      branchId: selectedBranchId,
      specialistId: selectedSpecialistId,
      serviceIds: ['1.1'], // Пример услуги
      date: '2024-02-25',
      time: '10:00',
      clientName: 'Тестовый клиент',
      clientPhone: '+7 (999) 123-45-67',
      clientEmail: 'test@example.com'
    })
  }

  if (citiesError) {
    return <div className="text-red-500">Ошибка загрузки городов: {citiesError.message}</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">API Layer Example</h2>
        <div className="text-sm text-gray-600">
          Режим: {isMocksEnabled() ? 'Моки' : 'Реальный API'}
        </div>
      </div>

      {/* Выбор города */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Город:</label>
        {citiesLoading ? (
          <div>Загрузка городов...</div>
        ) : (
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Выберите город</option>
            {cities?.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        )}
      </div>

      {/* Выбор филиала */}
      {selectedCity && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Филиал:</label>
          {branchesLoading ? (
            <div>Загрузка филиалов...</div>
          ) : (
            <select 
              value={selectedBranchId} 
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Выберите филиал</option>
              {branches?.map(branch => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} - {branch.address}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Выбор специалиста */}
      {selectedBranchId && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Специалист:</label>
          {specialistsLoading ? (
            <div>Загрузка специалистов...</div>
          ) : (
            <select 
              value={selectedSpecialistId} 
              onChange={(e) => setSelectedSpecialistId(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Выберите специалиста</option>
              {specialists?.map(specialist => (
                <option key={specialist.id} value={specialist.id}>
                  {specialist.name} - {specialist.position}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Список услуг */}
      {selectedSpecialistId && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Услуги:</label>
          {servicesLoading ? (
            <div>Загрузка услуг...</div>
          ) : (
            <div className="space-y-2">
              {services?.map(service => (
                <div key={service.id} className="p-2 border rounded">
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-gray-600">
                    Длительность: {service.duration} мин | Цена: {service.price} ₽
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Кнопка создания записи */}
      <div className="mt-6">
        <button
          onClick={handleBooking}
          disabled={createBookingMutation.isPending || !selectedBranchId || !selectedSpecialistId}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {createBookingMutation.isPending ? 'Создание записи...' : 'Создать запись'}
        </button>
      </div>

      {/* Результат создания записи */}
      {createBookingMutation.isSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          Запись успешно создана!
        </div>
      )}

      {createBookingMutation.isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          Ошибка создания записи: {createBookingMutation.error?.message}
        </div>
      )}

      {/* Информация о кэшировании */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-medium mb-2">Информация о кэшировании:</h3>
        <ul className="text-sm space-y-1">
          <li>• Города кэшируются на 5 минут</li>
          <li>• Филиалы кэшируются на 5 минут</li>
          <li>• Специалисты кэшируются на 5 минут</li>
          <li>• Услуги кэшируются на 10 минут</li>
        </ul>
      </div>
    </div>
  )
}