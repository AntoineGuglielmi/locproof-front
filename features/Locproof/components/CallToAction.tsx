import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import CTASection from '@/shared/components/layout/CTASection'
import Section from '@/shared/components/layout/section'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction Narrow', {
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
      which="topOnly"
      className={cn(CallToActionVariants({ variant, className }))}
    >
      <CTASection
        label="Étude terrain"
        title="Professionnel de l'immobilier ?"
        body="LocProof est actuellement en phase de validation auprès des
          professionnels du secteur. Votre retour peut contribuer directement à
          orienter la suite du projet."
        buttonHref="https://docs.google.com/forms/d/e/1FAIpQLSd-43UfevSepLzSHNNo4UEpqtRmIP9PYthkoIggwzMMeHWrxw/viewform?usp=header"
        buttonLabel="Participer à l'étude terrain"
        subBody="Le questionnaire prend environ 3 à 5 minutes."
        buttonTarget="_blank"
      />
    </Section>
  )
}
