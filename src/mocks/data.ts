import { IBranch, IService, ISpecialist, ITimeSlot } from '../store/bookingStore.types'

// Моковые данные для филиалов
export const branchesMock: IBranch[] = [
  {
    id: '1',
    name: 'Золотая линия Ленинградский',
    address: 'Ленинградский проспект, 31А',
    phone: '+7 (495) 123-45-67',
    workingHours: 'Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-20:00',
    city: 'Москва',
    district: 'Центральный',
    image: 'https://i.imgur.com/JFHjdNr.jpg'
  },
  {
    id: '2',
    name: 'Клиника на Пушкина',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 765-43-21',
    workingHours: '8:00 - 21:00',
    city: 'Москва',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500'
  },
  {
    id: '3',
    name: 'Клиника на Гагарина',
    address: 'ул. Гагарина, 15',
    phone: '+7 (999) 111-22-33',
    workingHours: '9:00 - 19:00',
    city: 'Санкт-Петербург',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=500'
  },
  {
    id: '4',
    name: 'Клиника на Невском',
    address: 'Невский проспект, 78',
    phone: '+7 (999) 444-55-66',
    workingHours: '8:30 - 20:30',
    city: 'Санкт-Петербург',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=500'
  }
]

// Моковые специалисты
export const mockSpecialists: ISpecialist[] = [
  {
    id: '1',
    name: 'Степанова Елена Анатольевна',
    position: 'Косметолог',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    reviewCount: 14,
    nearestSlot: '25 февраля, вт'
  },
  {
    id: '2',
    name: 'Иванов Сергей Петрович',
    position: 'Терапевт',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    reviewCount: 8,
    nearestSlot: '26 февраля, ср'
  },
  {
    id: '3',
    name: 'Петрова Анна Михайловна',
    position: 'Стоматолог',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 5,
    reviewCount: 21,
    nearestSlot: '27 февраля, чт'
  },
  {
    id: '4',
    name: 'Сидоров Алексей Владимирович',
    position: 'Невролог',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    rating: 4,
    reviewCount: 12,
    nearestSlot: '28 февраля, пт'
  },
  {
    id: '5',
    name: 'Козлова Мария Ивановна',
    position: 'Косметолог',
    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 4,
    reviewCount: 9,
    nearestSlot: '1 марта, сб'
  },
  {
    id: '6',
    name: 'Николаев Дмитрий Александрович',
    position: 'Терапевт',
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    rating: 5,
    reviewCount: 17,
    nearestSlot: '2 марта, вс'
  },
  {
    id: '7',
    name: 'Смирнова Ольга Сергеевна',
    position: 'Стоматолог',
    photo: 'https://randomuser.me/api/portraits/women/67.jpg',
    rating: 4,
    reviewCount: 11,
    nearestSlot: '3 марта, пн'
  },
  {
    id: '8',
    name: 'Кузнецов Игорь Николаевич',
    position: 'Невролог',
    photo: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 5,
    reviewCount: 15,
    nearestSlot: '4 марта, вт'
  },
  {
    id: '9',
    name: 'Морозова Екатерина Дмитриевна',
    position: 'Косметолог',
    photo: 'https://randomuser.me/api/portraits/women/89.jpg',
    rating: 5,
    reviewCount: 19,
    nearestSlot: '5 марта, ср'
  },
  {
    id: '10',
    name: 'Волков Андрей Петрович',
    position: 'Терапевт',
    photo: 'https://randomuser.me/api/portraits/men/23.jpg',
    rating: 4,
    reviewCount: 7,
    nearestSlot: '6 марта, чт'
  },
  {
    id: '11',
    name: 'Лебедева Наталья Александровна',
    position: 'Стоматолог',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 5,
    reviewCount: 22,
    nearestSlot: '7 марта, пт'
  },
  {
    id: '12',
    name: 'Соколов Виктор Иванович',
    position: 'Невролог',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4,
    reviewCount: 13,
    nearestSlot: '8 марта, сб'
  }
]

// Моковые услуги
export const mockServices: IService[] = [
  // Терапия
  {
    id: '1',
    name: 'Терапия',
    duration: 0,
    price: 0
  },
  {
    id: '1.1',
    name: 'Первичный прием терапевта',
    duration: 30,
    price: 2000,
    parentId: '1'
  },
  {
    id: '1.2',
    name: 'Повторный прием терапевта',
    duration: 20,
    price: 1500,
    parentId: '1'
  },

  // Кардиология
  {
    id: '2',
    name: 'Кардиология',
    duration: 0,
    price: 0
  },
  {
    id: '2.1',
    name: 'Первичный прием кардиолога',
    duration: 40,
    price: 2500,
    parentId: '2'
  },
  {
    id: '2.2',
    name: 'Повторный прием кардиолога',
    duration: 30,
    price: 2000,
    parentId: '2'
  },
  {
    id: '2.3',
    name: 'ЭКГ с расшифровкой',
    duration: 20,
    price: 1200,
    parentId: '2'
  },

  // Неврология
  {
    id: '3',
    name: 'Неврология',
    duration: 0,
    price: 0
  },
  {
    id: '3.1',
    name: 'Первичный прием невролога',
    duration: 40,
    price: 2300,
    parentId: '3'
  },
  {
    id: '3.2',
    name: 'Повторный прием невролога',
    duration: 30,
    price: 1800,
    parentId: '3'
  },

  // Эндокринология
  {
    id: '4',
    name: 'Эндокринология',
    duration: 0,
    price: 0
  },
  {
    id: '4.1',
    name: 'Первичный прием эндокринолога',
    duration: 40,
    price: 2400,
    parentId: '4'
  },
  {
    id: '4.2',
    name: 'Повторный прием эндокринолога',
    duration: 30,
    price: 1900,
    parentId: '4'
  },

  // Хирургия
  {
    id: '5',
    name: 'Хирургия',
    duration: 0,
    price: 0
  },
  {
    id: '5.1',
    name: 'Первичный прием хирурга',
    duration: 40,
    price: 2200,
    parentId: '5'
  },
  {
    id: '5.2',
    name: 'Повторный прием хирурга',
    duration: 30,
    price: 1700,
    parentId: '5'
  },
  {
    id: '5.3',
    name: 'Удаление доброкачественных новообразований',
    duration: 60,
    price: 5000,
    parentId: '5'
  }
]

// Генерация доступных дат (следующие 30 дней)
export const generateAvailableDates = (): string[] => {
  const dates: string[] = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Пропускаем выходные (суббота и воскресенье)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0])
    }
  }

  return dates
}

// Генерация временных слотов для выбранной даты
export const generateTimeSlots = (_date: string): ITimeSlot[] => {
  const slots: ITimeSlot[] = []
  const startHour = 9 // Начало рабочего дня (9:00)
  const endHour = 18 // Конец рабочего дня (18:00)

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      // Случайно определяем, доступен ли слот (80% вероятность)
      const available = Math.random() > 0.2

      slots.push({ time, available })
    }
  }

  return slots
}

// Список городов
export const mockCities = ['Москва', 'Санкт-Петербург']
