import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { TypeRentalReference } from '@/shared/types/profile-synthesis'
import {
  Calendar,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ThumbsUp,
  Wrench,
} from 'lucide-react'
import { ucfirst } from '@/lib/string'

type ReferenceItemProps = {
  className?: string
  children?: React.ReactNode
} & TypeRentalReference

const ReferenceItemVariants = cva(
  'ReferenceItem rounded-2xl border bg-white p-5 md:p-6',
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
  const criteria = [
    {
      value: paidOnTime,
      label: 'Loyers payés à temps',
      icon: Check,
    },
    {
      value: wellMaintained,
      label: 'Logement bien entretenu',
      icon: Wrench,
    },
    {
      value: communication,
      label: 'Communication fluide',
      icon: MessageCircle,
    },
    {
      value: recommended,
      label: 'Locataire recommandé',
      icon: ThumbsUp,
    },
  ]

  return (
    <article className={cn(ReferenceItemVariants({ className }))}>
      {/* RENTAL CONTEXT */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Expérience locative
          </p>

          <div className="mt-2 flex flex-col gap-1.5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-indigo-500" />
              <span>{cityPublic}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-indigo-500" />
              <span>
                {ucfirst(startDate)} → {ucfirst(endDate)}
              </span>
            </div>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
          <ShieldCheck className="size-3.5" />
          Référence vérifiée
        </div>
      </div>

      {/* CRITERIA */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t pt-5">
        {criteria.map(({ value, label, icon: Icon }) => {
          if (value !== 'yes') {
            return null
          }

          return (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Icon className="size-3.5" />
              </span>

              <span>{label}</span>
            </div>
          )
        })}
      </div>

      {/* COMMENT */}
      {comment && (
        <blockquote className="mt-6 rounded-xl bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-600">
          <span className="text-gray-300 text-2xl leading-none">“</span>
          <span className="ml-1">{comment}</span>
          <span className="text-gray-300 text-2xl leading-none">”</span>
        </blockquote>
      )}

      {/* FOOTER */}
      <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="size-3.5" />
        <span>Référence renseignée par un bailleur</span>
      </div>
    </article>
  )
}
