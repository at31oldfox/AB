import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

interface ICitySelectorProps {
  cities: string[]
  selectedCity: string | null
  onCityChange: (city: string) => void
  disabled?: boolean
}

const CitySelector = ({
  cities,
  selectedCity,
  onCityChange,
  disabled = false
}: ICitySelectorProps) => (
  <div className="mb-8">
    <Select value={selectedCity || undefined} onValueChange={onCityChange} disabled={disabled}>
      <SelectTrigger
        className={`w-full sm:w-[522px] bg-white border-[#E5E5E5] rounded-[4px] focus:ring-0 focus:ring-offset-0 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        <SelectValue placeholder="Выберите город" />
      </SelectTrigger>
      <SelectContent className="bg-white border-[#E5E5E5] rounded-[4px]">
        {cities.map((city) => (
          <SelectItem
            key={city}
            value={city}
            className="cursor-pointer transition-colors data-[highlighted]:bg-gray-100 data-[selected]:bg-gray-200 data-[selected]:font-medium">
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

export default CitySelector
