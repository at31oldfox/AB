// Типы для API ответов

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}

// Типы для запросов

export interface CreateBookingRequest {
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

export interface CreateBookingResponse {
  success: boolean
  message: string
  bookingId?: string
}

// Типы для фильтров

export interface BranchesFilter {
  city?: string
}

export interface SpecialistsFilter {
  branchId: string
  serviceIds?: string[]
}

export interface ServicesFilter {
  branchId?: string
  specialistId?: string
}

export interface AvailableDatesFilter {
  branchId: string
  specialistId: string
  serviceIds: string[]
}

export interface TimeSlotsFilter {
  branchId: string
  specialistId: string
  serviceIds: string[]
  date: string
}

// Типы для пагинации (если понадобится в будущем)

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}