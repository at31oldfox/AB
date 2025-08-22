// API эндпоинты
export const API_ENDPOINTS = {
  // Основные эндпоинты
  CITIES: '/cities',
  BRANCHES: '/branches',
  SPECIALISTS: '/specialists',
  SPECIALIST_DETAILS: (id: string) => `/specialists/${id}/details`,
  SERVICES: '/services',
  AVAILABLE_DATES: '/available-dates',
  TIME_SLOTS: '/time-slots',
  BOOKINGS: '/bookings',
  
  // Дополнительные эндпоинты (если понадобятся)
  REVIEWS: '/reviews',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile'
} as const

// HTTP методы
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

// HTTP статус коды
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const

// Настройки кэширования (в миллисекундах)
export const CACHE_TIMES = {
  CITIES: 5 * 60 * 1000, // 5 минут
  BRANCHES: 5 * 60 * 1000, // 5 минут
  SPECIALISTS: 5 * 60 * 1000, // 5 минут
  SPECIALIST_DETAILS: 10 * 60 * 1000, // 10 минут
  SERVICES: 10 * 60 * 1000, // 10 минут
  AVAILABLE_DATES: 2 * 60 * 1000, // 2 минуты
  TIME_SLOTS: 1 * 60 * 1000, // 1 минута
} as const

// Настройки сборки мусора (в миллисекундах)
export const GC_TIMES = {
  CITIES: 10 * 60 * 1000, // 10 минут
  BRANCHES: 10 * 60 * 1000, // 10 минут
  SPECIALISTS: 10 * 60 * 1000, // 10 минут
  SPECIALIST_DETAILS: 15 * 60 * 1000, // 15 минут
  SERVICES: 15 * 60 * 1000, // 15 минут
  AVAILABLE_DATES: 5 * 60 * 1000, // 5 минут
  TIME_SLOTS: 2 * 60 * 1000, // 2 минуты
} as const

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
  UNAUTHORIZED: 'Ошибка авторизации. Проверьте учетные данные.',
  FORBIDDEN: 'Доступ запрещен.',
  NOT_FOUND: 'Запрашиваемый ресурс не найден.',
  INTERNAL_ERROR: 'Внутренняя ошибка сервера.',
  TIMEOUT: 'Превышено время ожидания ответа от сервера.',
  UNKNOWN_ERROR: 'Произошла неизвестная ошибка.',
  SLOT_TAKEN: 'Дата и время уже заняты.',
  VALIDATION_ERROR: 'Ошибка валидации данных.',
} as const

// Настройки повторных попыток
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 секунда
  RETRY_DELAY_MULTIPLIER: 2,
} as const