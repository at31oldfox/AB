import ClinicCard from '@shared/components/ClinicCard/ClinicCard'

import { IBranch } from '@store/bookingStore.types'

interface IBranchListProps {
  selectedCity: string
  allBranches: IBranch[]
  cityBranches: IBranch[]
  isCitiesLoading: boolean
  isAllBranchesLoading: boolean
  isCityBranchesLoading: boolean
  isAllBranchesError: boolean
  isCityBranchesError: boolean
  onBranchSelect: (branch: IBranch) => void
}

const BranchList = ({
  selectedCity,
  allBranches,
  cityBranches,
  isCitiesLoading,
  isAllBranchesLoading,
  isCityBranchesLoading,
  isAllBranchesError,
  isCityBranchesError,
  onBranchSelect
}: IBranchListProps) => {
  const selectedBranches = selectedCity ? cityBranches : allBranches
  const isLoading =
    isCitiesLoading || isAllBranchesLoading || (!!selectedCity && isCityBranchesLoading)

  const hasError = selectedCity ? isCityBranchesError : isAllBranchesError

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Загрузка филиалов...</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Произошла ошибка при загрузке филиалов. Пожалуйста, попробуйте позже.</p>
      </div>
    )
  }

  if (selectedBranches.length === 0 && selectedCity) {
    return (
      <div className="text-center py-12">
        <p>В выбранном городе нет доступных филиалов</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {selectedBranches.map((branch) => (
        <ClinicCard key={branch.id} clinic={branch} onClick={() => onBranchSelect(branch)} />
      ))}
    </div>
  )
}

export default BranchList
