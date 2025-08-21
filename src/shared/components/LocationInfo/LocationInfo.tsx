import { FC } from 'react'

import { Clock, MapPin, Phone } from 'lucide-react'

interface LocationInfoProps {
  district?: string
}

export const LocationInfo: FC<LocationInfoProps> = ({ district }) => {
  return (
    <div className="mb-6">
      {district && <h2 className="text-2xl font-bold mb-4">{district}</h2>}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary" size={20} />
          <span>г. Кемерово, ул. Полевая, 16</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="text-primary" size={20} />
          <span>+7 (926)-250-25-96</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-primary" size={20} />
          <span>09:00 - 20:00</span>
        </div>
      </div>
    </div>
  )
}
