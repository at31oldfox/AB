import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useSpecialistCommentsQuery } from '../SpecialistDetailsPage.queries'
import { CommentItem } from './CommentItem'

type SortOption = 'newest' | 'oldest'

export const CommentsList = () => {
  const { id } = useParams<{ id: string }>()
  const { data: comments = [], isLoading, error } = useSpecialistCommentsQuery(id)
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption)
  }

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date.split(' ').slice(0, 3).join(' ')).getTime()
    const dateB = new Date(b.date.split(' ').slice(0, 3).join(' ')).getTime()

    return sortOption === 'newest' ? dateB - dateA : dateA - dateB
  })

  if (isLoading) {
    return (
      <div className="py-4 text-center">
        <p>Загрузка отзывов...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        <p>Ошибка при загрузке отзывов</p>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="py-4 text-center">
        <p>Отзывов пока нет</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#E5E5E5] p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">{comments.length} отзывов</h2>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-[#E5E5E5] rounded-lg px-4 py-2 pr-8 text-[#373741] focus:outline-none focus:ring-2 focus:ring-[#018ED7]"
            value={sortOption}
            onChange={handleSortChange}>
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {sortedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
