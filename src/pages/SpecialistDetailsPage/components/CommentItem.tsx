import { FC } from 'react'

import { IComment } from '@/store/bookingStore.types'

interface CommentItemProps {
  comment: IComment
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border border-[#E5E5E5] rounded-xl p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {comment.authorPhoto ? (
            <img
              src={comment.authorPhoto}
              alt={comment.authorName}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[60px] h-[60px] rounded-full bg-[#F2F9FF] flex items-center justify-center">
              <span className="text-[#018ED7] text-xl">
                {comment.authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-grow mt-2">
          <div className="flex flex-col   md:flex-col md:justify-start md:items-start sm:flex-row sm:justify-between sm:items-center mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h3 className="font-semibold text-[16px] text-[#373741]">{comment.authorName}</h3>
              <div className="text-[#7F7E7F] text-[16px] font-medium">{comment.date}</div>
            </div>
            <div className="flex mt-1 sm:mt-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <p className="text-[16px] font-normal text-[#373741] mt-2">{comment.text}</p>
        </div>
      </div>
    </div>
  )
}
