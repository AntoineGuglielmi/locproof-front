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
import Tag from '@/shared/components/text/tag'
import List from '@/shared/components/list/List'
import CriterionItem from './criterion-item'
import { TypeReferenceCriterion } from '../../types/TypeReferenceCriterion'

type ReferenceItemProps = {
  className?: string
  children?: React.ReactNode
  inHomePage?: boolean
} & TypeRentalReference

const ReferenceItemVariants = cva(
  'ReferenceItem @container rounded-2xl border bg-white p-5 md:p-6',
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
  inHomePage = false,
}: ReferenceItemProps) {
  const criteria: Array<TypeReferenceCriterion> = [
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
      <div
        className={`flex flex-col gap-3 ${inHomePage ? '@' : ''}sm:flex-row ${inHomePage ? '@' : ''}sm:items-center ${inHomePage ? '@' : ''}sm:justify-between`}
      >
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

        <Tag
          size="small"
          type="success"
          Icon={ShieldCheck}
        >
          Référence vérifiée
        </Tag>
      </div>

      {/* CRITERIA */}
      <List
        items={criteria}
        renderItem={CriterionItem}
        getKey={(item) => item.label}
        className={`mt-6 grid grid-cols-1 ${inHomePage ? '@' : ''}sm:grid-cols-2 gap-x-6 gap-y-3 border-t pt-5`}
      />

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
