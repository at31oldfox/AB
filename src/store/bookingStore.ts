import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IBookingState } from './bookingStore.types'

const useBookingStore = create<IBookingState>()(
  devtools(
    persist(
      (set) => ({
        selectedCity: '',
        branch: null,
        selectedBranch: null,
        selectedSpecialist: null,
        selectedServices: [],
        selectedDate: null,
        selectedTime: null,
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientComment: '',

        setSelectedCity: (city) => set({ selectedCity: city }),
        setBranch: (branch) => set({ selectedBranch: branch }),
        setSpecialist: (specialist) => set({ selectedSpecialist: specialist }),
        addService: (service) =>
          set((state) => ({
            selectedServices: [...state.selectedServices, service]
          })),
        removeService: (serviceId) =>
          set((state) => ({
            selectedServices: state.selectedServices.filter((s) => s.id !== serviceId)
          })),
        setDate: (date) => set({ selectedDate: date }),
        setTime: (time) => set({ selectedTime: time }),
        setClientInfo: (name, phone, email, comment) =>
          set({
            clientName: name,
            clientPhone: phone,
            clientEmail: email,
            clientComment: comment
          }),
        resetBooking: () =>
          set({
            selectedSpecialist: null,
            selectedServices: [],
            selectedDate: null,
            selectedTime: null,
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            clientComment: '',
            selectedCity: ''
          })
      }),
      {
        name: 'booking-storage'
      }
    )
  )
)

export default useBookingStore
