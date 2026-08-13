import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Check } from 'lucide-react'

type ExplanationProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ExplanationVariants = cva('Explanation border-t py-10', {
  variants: {
    variant: {
      default: '',
      other: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default function Explanation({ className, variant }: ExplanationProps) {
  return (
    <section className={cn(ExplanationVariants({ variant, className }))}>
      <div className="flex flex-col gap-3 text-sm text-gray-500">
        <div className="flex gap-2 items-start">
          <Check className="size-4 mt-0.5 shrink-0 text-green-600" />

          <p>Les références sont renseignées directement par les bailleurs.</p>
        </div>

        <div className="flex gap-2 items-start">
          <Check className="size-4 mt-0.5 shrink-0 text-green-600" />

          <p>
            Les informations affichées ne constituent pas une notation du
            locataire.
          </p>
        </div>

        <div className="flex gap-2 items-start">
          <Check className="size-4 mt-0.5 shrink-0 text-green-600" />

          <p>
            LocProof apporte un complément qualitatif au dossier locatif
            traditionnel.
          </p>
        </div>
      </div>
    </section>
  )
}
