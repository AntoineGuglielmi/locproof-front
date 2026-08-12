import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Narrow } from '@/shared/components/layout/grid'
import CTASection from '@/shared/components/layout/CTASection'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction my-20 md:my-34', {
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
        label="Étude terrain"
        title="Professionnel de l'immobilier ?"
        body="LocProof est actuellement en phase de validation auprès des
          professionnels du secteur. Votre retour peut contribuer directement à
          orienter la suite du projet."
        buttonHref="/survey"
        buttonLabel="Participer à l'étude terrain"
        subBody="Le questionnaire prend environ 3 à 5 minutes."
      />
    </Narrow>
  )
}
