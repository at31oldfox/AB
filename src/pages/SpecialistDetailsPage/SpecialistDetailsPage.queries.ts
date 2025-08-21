import { specialistCommentsMock } from '@mocks/specialistComments'
import { specialistDetailsMock } from '@mocks/specialistDetails'
import { useQuery } from '@tanstack/react-query'

import { IComment, IService, ISpecialistDetails } from '@store/bookingStore.types'

// Имитация API запроса для деталей специалиста
const fetchSpecialistDetails = async (id: string): Promise<ISpecialistDetails> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  const specialist = specialistDetailsMock[id]

  if (!specialist) {
    throw new Error(`Specialist with id ${id} not found`)
  }

  return specialist
}

// Имитация API запроса для сервисов специалиста
const fetchSpecialistServices = async (_id: string): Promise<IService[]> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Моковые данные для сервисов
  const services: IService[] = [
    {
      id: '1',
      name: 'Консультация',
      duration: 30,
      price: 1500,
      parentId: 'Приём и консультации'
    },
    {
      id: '2',
      name: 'Повторный приём',
      duration: 20,
      price: 1200,
      parentId: 'Приём и консультации'
    },
    {
      id: '3',
      name: 'Чистка лица',
      duration: 60,
      price: 3500,
      parentId: 'Косметология'
    },
    {
      id: '4',
      name: 'Пилинг',
      duration: 45,
      price: 2800,
      parentId: 'Косметология'
    },
    {
      id: '5',
      name: 'Лазерная шлифовка',
      duration: 40,
      price: 4500,
      parentId: 'Аппаратная косметология'
    },
    {
      id: '6',
      name: 'RF-лифтинг',
      duration: 50,
      price: 5000,
      parentId: 'Аппаратная косметология'
    }
  ]

  // Фильтруем сервисы по ID специалиста (в реальном приложении)
  // Здесь просто возвращаем все сервисы для демонстрации
  return services
}

// Добавить новую функцию для получения комментариев
const fetchSpecialistComments = async (id: string): Promise<IComment[]> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 600))

  const comments = specialistCommentsMock[id] || []
  return comments
}

export const useSpecialistDetailsQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['specialistDetails', id],
    queryFn: () => (id ? fetchSpecialistDetails(id) : Promise.reject('No ID provided')),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1
  })
}

export const useSpecialistServicesQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['specialistServices', id],
    queryFn: () => (id ? fetchSpecialistServices(id) : Promise.reject('No ID provided')),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1
  })
}

// Добавить новый хук для запроса комментариев
export const useSpecialistCommentsQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['specialistComments', id],
    queryFn: () => (id ? fetchSpecialistComments(id) : Promise.reject('No ID provided')),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1
  })
}
