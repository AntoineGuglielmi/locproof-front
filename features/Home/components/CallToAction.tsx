import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Narrow } from '@/shared/components/layout/grid'
import CTASection from '@/shared/components/layout/CTASection'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction mb-20 md:mb-34', {
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

export default function CallToAction({
  className,
  variant,
}: CallToActionProps) {
  return (
    <Narrow className={cn(CallToActionVariants({ variant, className }))}>
      <CTASection
        title="Votre expérience de locataire mérite aussi d'être prise en compte."
        body="Demandez une référence à votre ancien bailleur et ajoutez une nouvelle
          dimension à votre prochain dossier de location."
        buttonHref="/validate-email"
        buttonLabel="Obtenir ma référence"
      />
    </Narrow>
  )
}
