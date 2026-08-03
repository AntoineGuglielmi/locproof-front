/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { TypeRentalReference } from '@/shared/types/profile-synthesis'
import { ArrowRight, Calendar, Check, MapPin } from 'lucide-react'
import { ucfirst } from '@/lib/string'

type ReferenceItemProps = {
  className?: string
  children?: React.ReactNode
} & TypeRentalReference

const ReferenceItemVariants = cva(
  'ReferenceItem bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4',
  {
    variants: {},
    defaultVariants: {},
  },
)

export default function ReferenceItem({
  className,
  cityPublic,
  startDate,
  endDate,
  comment,
  paidOnTime,
  wellMaintained,
  communication,
  recommended,
}: ReferenceItemProps) {
  const scoresDisplay = [
    {
      name: 'paidOnTime',
      label: 'Loyers payés à temps',
    },
    {
      name: 'wellMaintained',
      label: 'Logement bien entretenu',
    },
    {
      name: 'communication',
      label: 'Communication fluide',
    },
    {
      name: 'recommended',
      label: 'Recommandé',
    },
  ] as const

  const reference = {
    paidOnTime,
    wellMaintained,
    communication,
    recommended,
  }

  return (
    <div className={cn(ReferenceItemVariants({ className }))}>
      <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <MapPin
              size={14}
              className="text-indigo-500"
            />{' '}
            {cityPublic}
          </div>
          <div className="flex gap-2 items-center">
            <Calendar
              size={14}
              className="text-indigo-500"
            />{' '}
            {ucfirst(startDate)} <ArrowRight size={14} /> {ucfirst(endDate)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
        {scoresDisplay.map(({ name, label }) => {
          return reference[name] === 'yes' ? (
            <p
              key={label}
              className="flex gap-2 items-center"
            >
              <Check size={16} />
              {label}
            </p>
          ) : null
        })}
      </div>

      {comment && (
        <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic">
          "{comment}"
        </div>
      )}

      <div className="text-xs text-gray-400">
        Recommandation vérifiée par un bailleur
      </div>
    </div>
  )
}
