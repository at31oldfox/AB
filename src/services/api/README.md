# API Layer Documentation

## Обзор

API слой предоставляет единый интерфейс для работы с внешним API и моковыми данными. Архитектура позволяет легко переключаться между реальным API и моками без изменения кода компонентов.

## Структура

```
src/services/api/
├── config.ts      # Конфигурация API (URL, аутентификация, таймауты)
├── client.ts      # Настроенный axios клиент с интерцепторами
├── api.ts         # Основные функции API
├── hooks.ts       # React Query хуки
├── utils.ts       # Утилиты для работы с API
└── index.ts       # Экспорты всех модулей
```

## Конфигурация

### Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```env
# API Configuration
VITE_API_URL=http://212.41.9.83/api/hs/v1/
VITE_USE_MOCKS=true

# API Authentication
VITE_API_USERNAME=Администратор
VITE_API_PASSWORD=

# API Timeout (in milliseconds)
VITE_API_TIMEOUT=30000
```

### Переключение между моками и реальным API

Для переключения между моками и реальным API измените переменную `VITE_USE_MOCKS`:

- `VITE_USE_MOCKS=true` - использовать моковые данные
- `VITE_USE_MOCKS=false` - использовать реальный API

## Использование

### 1. Прямые вызовы API

```typescript
import { fetchCities, fetchBranches, createBooking } from '@services/api'

// Получение городов
const cities = await fetchCities()

// Получение филиалов по городу
const branches = await fetchBranches('Москва')

// Создание записи
const result = await createBooking({
  branchId: '1',
  specialistId: '1',
  serviceIds: ['1.1'],
  date: '2024-02-25',
  time: '10:00',
  clientName: 'Иван Иванов',
  clientPhone: '+7 (999) 123-45-67'
})
```

### 2. React Query хуки

```typescript
import { useCities, useBranches, useCreateBooking } from '@services/api'

function MyComponent() {
  // Получение городов
  const { data: cities, isLoading, error } = useCities()
  
  // Получение филиалов
  const { data: branches } = useBranches('Москва')
  
  // Создание записи
  const createBookingMutation = useCreateBooking()
  
  const handleBooking = () => {
    createBookingMutation.mutate({
      branchId: '1',
      specialistId: '1',
      serviceIds: ['1.1'],
      date: '2024-02-25',
      time: '10:00',
      clientName: 'Иван Иванов',
      clientPhone: '+7 (999) 123-45-67'
    })
  }
  
  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error.message}</div>
  
  return (
    <div>
      {cities?.map(city => <div key={city}>{city}</div>)}
    </div>
  )
}
```

## Доступные функции

### Основные API функции

- `fetchCities()` - получение списка городов
- `fetchBranches(city?)` - получение филиалов
- `fetchSpecialists(branchId, serviceIds?)` - получение специалистов
- `fetchSpecialistDetails(id)` - получение деталей специалиста
- `fetchServices(branchId?, specialistId?)` - получение услуг
- `fetchAvailableDates(branchId, specialistId, serviceIds)` - получение доступных дат
- `fetchTimeSlots(branchId, specialistId, serviceIds, date)` - получение временных слотов
- `createBooking(bookingData)` - создание записи

### React Query хуки

- `useCities()` - хук для получения городов
- `useBranches(city?)` - хук для получения филиалов
- `useSpecialists(branchId, serviceIds?)` - хук для получения специалистов
- `useSpecialistDetails(id)` - хук для получения деталей специалиста
- `useServices(branchId?, specialistId?)` - хук для получения услуг
- `useAvailableDates(branchId, specialistId, serviceIds)` - хук для получения доступных дат
- `useTimeSlots(branchId, specialistId, serviceIds, date)` - хук для получения временных слотов
- `useCreateBooking()` - хук для создания записи

## Обработка ошибок

API слой автоматически обрабатывает ошибки и предоставляет понятные сообщения:

- 401 - Ошибка авторизации
- 403 - Доступ запрещен
- 404 - Ресурс не найден
- 500 - Внутренняя ошибка сервера
- Сетевые ошибки - Нет ответа от сервера

## Кэширование

React Query автоматически кэширует данные с настройками:

- **Города, филиалы, специалисты**: 5 минут
- **Услуги, детали специалиста**: 10 минут
- **Доступные даты**: 2 минуты
- **Временные слоты**: 1 минута

## Изменение URL API

Для изменения URL API:

1. Измените переменную `VITE_API_URL` в файле `.env`
2. Или измените `BASE_URL` в `src/services/api/config.ts`

```typescript
// В config.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://new-api-url.com/api/',
  // ...
}
```

## Аутентификация

API использует Basic Auth с учетными данными:
- Username: "Администратор"
- Password: (пустой)

Для изменения учетных данных используйте переменные окружения:
- `VITE_API_USERNAME`
- `VITE_API_PASSWORD`
