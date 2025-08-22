// Конфигурация API
export const API_CONFIG = {
  // Базовый URL API - можно легко изменить через переменные окружения
  BASE_URL: import.meta.env.VITE_API_URL || 'http://212.41.9.83/api/hs/v1/',
  
  // Настройки аутентификации
  AUTH: {
    username: import.meta.env.VITE_API_USERNAME || 'Администратор',
    password: import.meta.env.VITE_API_PASSWORD || ''
  },
  
  // Таймауты
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  
  // Заголовки по умолчанию
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// Функция для создания Basic Auth заголовка
export const createAuthHeader = (): string => {
  const { username, password } = API_CONFIG.AUTH
  const credentials = `${username}:${password}`
  return `Basic ${btoa(credentials)}`
}

// Функция для получения полного URL эндпоинта
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}