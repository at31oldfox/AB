import { IComment } from '@store/bookingStore.types'

export const specialistCommentsMock: Record<string, IComment[]> = {
  '1': [
    {
      id: '1',
      authorName: 'Ирина',
      authorPhoto: 'https://i.imgur.com/JlWJUQV.jpg',
      rating: 5,
      date: '20 февраля 2025',
      text: 'Lorem ipsum dolor sit amet consectetur. Diam vitae sapien sapien amet. Molestie gravida eget volutpat mattis lorem at tempus dolor. Sollicitudin at dignissim augue facilisi lectus erat viverra felis fringilla. Quis a faucibus aenean sodales est senectus mauris habitant pulvinar.'
    },
    {
      id: '2',
      authorName: 'Ирина',
      authorPhoto: 'https://i.imgur.com/JlWJUQV.jpg',
      rating: 4,
      date: '20 февраля 2025',
      text: 'Lorem ipsum dolor sit amet consectetur. Diam vitae sapien sapien amet. Molestie gravida eget volutpat mattis lorem at tempus dolor. Sollicitudin at dignissim augue facilisi lectus erat viverra felis fringilla. Quis a faucibus aenean sodales est senectus mauris habitant pulvinar.'
    },
    {
      id: '3',
      authorName: 'Ирина',
      authorPhoto: 'https://i.imgur.com/JlWJUQV.jpg',
      rating: 5,
      date: '20 февраля 2025',
      text: 'Lorem ipsum dolor sit amet consectetur. Diam vitae sapien sapien amet. Molestie gravida eget volutpat mattis lorem at tempus dolor. Sollicitudin at dignissim augue facilisi lectus erat viverra felis fringilla. Quis a faucibus aenean sodales est senectus mauris habitant pulvinar.'
    },
    {
      id: '4',
      authorName: 'Ирина',
      authorPhoto: 'https://i.imgur.com/JlWJUQV.jpg',
      rating: 5,
      date: '20 февраля 2025',
      text: 'Lorem ipsum dolor sit amet consectetur. Diam vitae sapien sapien amet. Molestie gravida eget volutpat mattis lorem at tempus dolor. Sollicitudin at dignissim augue facilisi lectus erat viverra felis fringilla. Quis a faucibus aenean sodales est senectus mauris habitant pulvinar.'
    }
  ],
  '2': [
    {
      id: '5',
      authorName: 'Алексей',
      authorPhoto: 'https://i.imgur.com/8KLbDvq.jpg',
      rating: 4,
      date: '15 февраля 2025',
      text: 'Отличный специалист, очень внимательный и профессиональный. Рекомендую всем, кто ищет хорошего терапевта.'
    },
    {
      id: '6',
      authorName: 'Мария',
      authorPhoto: 'https://i.imgur.com/JlWJUQV.jpg',
      rating: 5,
      date: '10 февраля 2025',
      text: 'Была на приеме у доктора, осталась очень довольна. Грамотный подход и эффективное лечение.'
    }
  ]
}
