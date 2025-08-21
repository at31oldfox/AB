export interface ISpecialist {
  id: string
  name: string
  position: string
  photo?: string
  rating: number
  reviewCount: number
  nearestSlot?: string
}

export interface IService {
  id: string
  name: string
  duration: number
  price: number
  parentId?: string
}

export interface IBranch {
  id: string
  name: string
  district?: string
  address?: string
  phone?: string
  hours?: string
  workingHours: string
  city: string
  image?: string
}

export interface ITimeSlot {
  time: string
  available: boolean
}

export interface IBookingState {
  selectedCity: string
  branch: IBranch | null
  selectedBranch: IBranch | null
  selectedSpecialist: ISpecialist | null
  selectedServices: IService[]
  selectedDate: string | null
  selectedTime: string | null
  clientName: string
  clientPhone: string
  clientEmail: string
  clientComment: string

  // Действия
  setSelectedCity: (city: string) => void
  setBranch: (branch: IBranch | null) => void
  setSpecialist: (specialist: ISpecialist | null) => void
  addService: (service: IService) => void
  removeService: (serviceId: string) => void
  setDate: (date: string | null) => void
  setTime: (time: string | null) => void
  setClientInfo: (name: string, phone: string, email: string, comment: string) => void
  resetBooking: () => void
}

export interface IHelpsWithSection {
  title: string
  items: string[]
}

export interface IServiceSection {
  title: string
  items: string[]
}

export interface ISpecialistDetails extends ISpecialist {
  experience: string
  clinic: string
  about: string
  helpsWith: IHelpsWithSection[]
  services: IServiceSection[]
}

export interface IComment {
  id: string
  authorName: string
  authorPhoto?: string
  rating: number
  date: string
  text: string
}
