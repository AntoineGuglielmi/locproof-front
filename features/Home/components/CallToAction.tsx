import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import CTASection from '@/shared/components/layout/CTASection'
import Section from '@/shared/components/layout/section'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction grid-narrow', {
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
    <Section
      size="none"
      className={cn(CallToActionVariants({ variant, className }))}
    >
      <CTASection
        title="Votre expérience de locataire mérite aussi d'être prise en compte."
        body="Demandez une référence à votre ancien bailleur et ajoutez une nouvelle
          dimension à votre prochain dossier de location."
        buttonHref="/validate-email"
        buttonLabel="Obtenir ma référence"
      />
    </Section>
  )
}
