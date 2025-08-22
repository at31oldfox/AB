# Руководство по интеграции API

## Что было реализовано

Я создал полноценный API слой для вашего проекта с возможностью легкого переключения между моками и реальным API. Вот что было добавлено:

### 📁 Структура API слоя

```
src/services/api/
├── config.ts          # Конфигурация API (URL, аутентификация)
├── client.ts          # Настроенный axios клиент с Basic Auth
├── api.ts             # Основные функции API (обновлены)
├── hooks.ts           # React Query хуки для всех эндпоинтов
├── utils.ts           # Утилиты (обработка ошибок, валидация)
├── types.ts           # TypeScript типы для API
├── constants.ts       # Константы (эндпоинты, кэширование)
├── index.ts           # Экспорты всех модулей
└── README.md          # Документация API слоя
```

### 🔧 Основные возможности

1. **Легкое переключение между моками и реальным API**
   - Переменная окружения `VITE_USE_MOCKS`
   - Без изменения кода компонентов

2. **Настроенная аутентификация**
   - Basic Auth с учетными данными "Администратор" / ""
   - Автоматическое добавление заголовков

3. **React Query интеграция**
   - Готовые хуки для всех эндпоинтов
   - Автоматическое кэширование
   - Обработка состояний загрузки и ошибок

4. **Обработка ошибок**
   - Централизованная обработка HTTP ошибок
   - Понятные сообщения на русском языке

5. **Конфигурируемость**
   - Переменные окружения для всех настроек
   - Легкое изменение URL API

## 🚀 Быстрый старт

### 1. Создайте файл .env

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

### 2. Использование в компонентах

#### Вариант 1: React Query хуки (рекомендуется)

```typescript
import { useCities, useBranches, useCreateBooking } from '@services/api'

function MyComponent() {
  const { data: cities, isLoading, error } = useCities()
  const { data: branches } = useBranches('Москва')
  const createBooking = useCreateBooking()

  const handleBooking = () => {
    createBooking.mutate({
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

#### Вариант 2: Прямые вызовы API

```typescript
import { fetchCities, fetchBranches, createBooking } from '@services/api'

// В async функции
const cities = await fetchCities()
const branches = await fetchBranches('Москва')
const result = await createBooking(bookingData)
```

## 🔄 Переключение между моками и реальным API

### Для использования моков:
```env
VITE_USE_MOCKS=true
```

### Для использования реального API:
```env
VITE_USE_MOCKS=false
```

## 📊 Доступные эндпоинты

| Функция | Эндпоинт | Описание |
|---------|----------|----------|
| `fetchCities()` | `GET /cities` | Получение списка городов |
| `fetchBranches(city?)` | `GET /branches` | Получение филиалов |
| `fetchSpecialists(branchId, serviceIds?)` | `GET /specialists` | Получение специалистов |
| `fetchSpecialistDetails(id)` | `GET /specialists/{id}/details` | Детали специалиста |
| `fetchServices(branchId?, specialistId?)` | `GET /services` | Получение услуг |
| `fetchAvailableDates(...)` | `GET /available-dates` | Доступные даты |
| `fetchTimeSlots(...)` | `GET /time-slots` | Временные слоты |
| `createBooking(data)` | `POST /bookings` | Создание записи |

## 🎯 React Query хуки

Все хуки автоматически:
- Кэшируют данные с оптимальными настройками
- Обрабатывают состояния загрузки и ошибок
- Инвалидируют кэш при необходимости

```typescript
// Доступные хуки
useCities()
useBranches(city?)
useSpecialists(branchId, serviceIds?)
useSpecialistDetails(id)
useServices(branchId?, specialistId?)
useAvailableDates(branchId, specialistId, serviceIds)
useTimeSlots(branchId, specialistId, serviceIds, date)
useCreateBooking()
```

## ⚙️ Настройки кэширования

- **Города, филиалы, специалисты**: 5 минут
- **Услуги, детали специалиста**: 10 минут  
- **Доступные даты**: 2 минуты
- **Временные слоты**: 1 минута

## 🔧 Изменение URL API

### Способ 1: Переменная окружения
```env
VITE_API_URL=http://new-api-url.com/api/
```

### Способ 2: Прямое изменение в коде
```typescript
// src/services/api/config.ts
export const API_CONFIG = {
  BASE_URL: 'http://new-api-url.com/api/',
  // ...
}
```

## 🛡️ Обработка ошибок

API слой автоматически обрабатывает:
- 401 - Ошибка авторизации
- 403 - Доступ запрещен  
- 404 - Ресурс не найден
- 500 - Внутренняя ошибка сервера
- Сетевые ошибки
- Таймауты

## 📝 Пример компонента

Создан пример компонента `ApiExample.tsx`, который демонстрирует использование всех возможностей API слоя.

## 🎉 Преимущества реализации

1. **Модульность** - каждый аспект API вынесен в отдельный файл
2. **Типобезопасность** - полная поддержка TypeScript
3. **Гибкость** - легко переключаться между моками и реальным API
4. **Производительность** - интеллектуальное кэширование с React Query
5. **Надежность** - централизованная обработка ошибок
6. **Масштабируемость** - легко добавлять новые эндпоинты

## 🔮 Следующие шаги

1. Протестируйте API слой с моками
2. Переключитесь на реальный API, изменив `VITE_USE_MOCKS=false`
3. Настройте эндпоинты под ваше реальное API
4. Добавьте дополнительные эндпоинты по необходимости

API слой готов к использованию! 🚀