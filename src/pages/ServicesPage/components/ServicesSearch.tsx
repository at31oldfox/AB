import React from 'react'

interface IServicesSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const ServicesSearch: React.FC<IServicesSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          className="w-5 h-5 text-[#6B6B7B]"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <input
        type="text"
        className="block w-full rounded-lg border border-[#E5E5E5] py-3 pl-12 pr-10 bg-white focus:outline-none focus:border-[#CCCCCC] hover:border-[#CCCCCC]"
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#6B6B7B] hover:text-[#373741]"
          onClick={handleClear}
          type="button">
          <svg
            className="w-5 h-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ServicesSearch
