import { API_CONFIG } from './config'

// Утилиты для работы с API

/**
 * Проверяет, включены ли моки
 */
export const isMocksEnabled = (): boolean => {
  return import.meta.env.VITE_USE_MOCKS === 'true' || false
}

/**
 * Получает текущую конфигурацию API
 */
export const getApiConfig = () => {
  return {
    ...API_CONFIG,
    useMocks: isMocksEnabled()
  }
}

/**
 * Функция для имитации задержки сети (используется в моках)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Обработчик ошибок API
 */
export const handleApiError = (error: any): { success: false; message: string } => {
  if (error.response) {
    // Сервер ответил с ошибкой
    const status = error.response.status
    const data = error.response.data

    switch (status) {
      case 401:
        return { success: false, message: 'Ошибка авторизации. Проверьте учетные данные.' }
      case 403:
        return { success: false, message: 'Доступ запрещен.' }
      case 404:
        return { success: false, message: 'Запрашиваемый ресурс не найден.' }
      case 500:
        return { success: false, message: 'Внутренняя ошибка сервера.' }
      default:
        return { 
          success: false, 
          message: data?.message || `Ошибка ${status}: ${data?.error || 'Неизвестная ошибка'}` 
        }
    }
  } else if (error.request) {
    // Запрос был отправлен, но ответ не получен
    return { success: false, message: 'Нет ответа от сервера. Проверьте подключение к интернету.' }
  } else {
    // Ошибка при настройке запроса
    return { success: false, message: 'Ошибка при отправке запроса.' }
  }
}

/**
 * Валидация параметров запроса
 */
export const validateParams = (params: Record<string, any>): boolean => {
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') {
      console.warn(`API Warning: Parameter "${key}" is empty or undefined`)
      return false
    }
  }
  return true
}

/**
 * Форматирование параметров для URL
 */
export const formatQueryParams = (params: Record<string, any>): Record<string, string> => {
  const formatted: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        formatted[key] = value.join(',')
      } else {
        formatted[key] = String(value)
      }
    }
  }
  
  return formatted
}