interface AvailableTimeItemProps {
  time: string
  available: boolean
  isSelected: boolean
  onClick: () => void
}

const AvailableTimeItem = ({ time, available, isSelected, onClick }: AvailableTimeItemProps) => {
  return (
    <div
      className={`text-[#373741] font-medium text-base min-w-[90px] mr-4
        flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer
         transition-colors bg-[#F5F5F7] border-2 border-[#F5F5F7]
        ${isSelected ? 'border-[#018ED7]' : 'hover:border-[#018ED7]'}
      `}
      onClick={() => available && onClick()}>
      {time}
    </div>
  )
}

export default AvailableTimeItem
