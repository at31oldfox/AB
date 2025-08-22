import axios from 'axios'
import { API_CONFIG, createAuthHeader } from './config'

// Создаем настроенный экземпляр axios
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    ...API_CONFIG.DEFAULT_HEADERS,
    'Authorization': createAuthHeader()
  }
})

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Логируем ошибки в консоль для отладки
    console.error('API Error:', error.response?.data || error.message)
    
    // Возвращаем ошибку для обработки в компонентах
    return Promise.reject(error)
  }
)

// Интерцептор для добавления заголовков к каждому запросу
apiClient.interceptors.request.use(
  (config) => {
    // Убеждаемся, что заголовок авторизации присутствует
    if (!config.headers.Authorization) {
      config.headers.Authorization = createAuthHeader()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)