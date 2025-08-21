import { specialistDetailsMock } from '@mocks/specialistDetails'
import axios from 'axios'

import { IBranch, IService, ISpecialist, ITimeSlot } from '@store/bookingStore.types'
import { ISpecialistDetails } from '@store/bookingStore.types'

import {
  branchesMock,
  generateAvailableDates,
  generateTimeSlots,
  mockCities,
  mockServices,
  mockSpecialists
} from '../../mocks/data'

// Создаем экземпляр axios с базовым URL
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Флаг для использования моковых данных
const USE_MOCKS = true

// Функция для имитации задержки сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchCities = async (): Promise<string[]> => {
  if (USE_MOCKS) {
    await delay(500) // Имитация задержки сети
    return mockCities
  }

  const response = await api.get('/cities')
  return response.data
}

export const fetchBranches = async (city?: string): Promise<IBranch[]> => {
  if (USE_MOCKS) {
    await delay(700) // Имитация задержки сети

    if (city) {
      return branchesMock.filter((branch: IBranch) => branch.city === city)
    }

    return branchesMock
  }

  const params = city ? { city } : {}
  const response = await api.get('/branches', { params })
  return response.data
}

export const fetchSpecialists = async (
  branchId: string,
  serviceIds?: string[]
): Promise<ISpecialist[]> => {
  if (USE_MOCKS) {
    await delay(800) // Имитация задержки сети

    // Если указаны услуги, фильтруем специалистов, которые их оказывают
    if (serviceIds && serviceIds.length > 0) {
      // В реальном API здесь был бы фильтр по услугам
      // Для мока просто возвращаем случайное подмножество специалистов
      return mockSpecialists.filter(() => Math.random() > 0.3)
    }

    return mockSpecialists
  }

  const params = { branchId, serviceIds: serviceIds?.join(',') }
  const response = await api.get('/specialists', { params })
  return response.data
}

export const fetchSpecialistDetails = async (id: string): Promise<ISpecialistDetails> => {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  const specialist = specialistDetailsMock[id]

  if (!specialist) {
    throw new Error(`Specialist with id ${id} not found`)
  }

  return specialist
}

export const fetchServices = async (
  branchId?: string,
  specialistId?: string
): Promise<IService[]> => {
  if (USE_MOCKS) {
    await delay(600) // Имитация задержки сети

    if (specialistId) {
      // Если указан специалист, возвращаем только услуги, которые он оказывает
      // В реальном API здесь был бы фильтр по специалисту
      // Для мока просто возвращаем услуги в зависимости от ID специалиста

      const specialistIndex = parseInt(specialistId, 10)
      if (specialistIndex <= 5) {
        // Возвращаем услуги соответствующей категории для специалиста
        const categoryId = specialistIndex.toString()
        return mockServices.filter((s) => s.id === categoryId || s.parentId === categoryId)
      }
    }

    return mockServices
  }

  const params = { branchId, specialistId }
  const response = await api.get('/services', { params })
  return response.data
}

export const fetchAvailableDates = async (
  branchId: string,
  specialistId: string,
  serviceIds: string[]
): Promise<string[]> => {
  if (USE_MOCKS) {
    await delay(700) // Имитация задержки сети
    return generateAvailableDates()
  }

  const params = { branchId, specialistId, serviceIds: serviceIds.join(',') }
  const response = await api.get('/available-dates', { params })
  return response.data
}

export const fetchTimeSlots = async (
  branchId: string,
  specialistId: string,
  serviceIds: string[],
  date: string
): Promise<ITimeSlot[]> => {
  if (USE_MOCKS) {
    await delay(600) // Имитация задержки сети
    return generateTimeSlots(date)
  }

  const params = { branchId, specialistId, serviceIds: serviceIds.join(','), date }
  const response = await api.get('/time-slots', { params })
  return response.data
}

// Добавим интерфейс для ошибки с ответом
interface IApiErrorWithResponse extends Error {
  response?: {
    data?: {
      message?: string
    }
  }
}

// Define a proper type for booking data
export interface IBookingData {
  branchId: string
  specialistId: string
  serviceIds: string[]
  date: string
  time: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  clientComment?: string
}

export const createBooking = async (
  bookingData: IBookingData
): Promise<{ success: boolean; message: string }> => {
  if (USE_MOCKS) {
    await delay(1000) // Имитация задержки сети

    // Симулируем успешное создание записи с вероятностью 90%
    if (Math.random() > 0.1) {
      return { success: true, message: 'Запись успешно создана' }
    } else {
      // Иногда симулируем ошибку "слот занят"
      return { success: false, message: 'Дата и время уже заняты' }
    }
  }

  try {
    const response = await api.post('/bookings', bookingData)
    return { success: true, message: response.data.message }
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'response' in error &&
      (error as IApiErrorWithResponse).response?.data?.message === 'slot_taken'
    ) {
      return { success: false, message: 'Дата и время уже заняты' }
    }
    return { success: false, message: 'Произошла ошибка при создании записи' }
  }
}
