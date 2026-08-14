import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type PurposeProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const PurposeVariants = cva('Purpose', {
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

export default function Purpose({ className, variant }: PurposeProps) {
  return (
    <Section className={cn(PurposeVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le service</SectionLabel>

        <SectionTitle>À quoi sert LocProof ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof permet aux locataires de solliciter une référence auprès
            d’un ancien bailleur afin de valoriser leur expérience locative dans
            le cadre de futures recherches de logement.
          </TextBody>

          <TextBody>
            Le service permet notamment au bailleur de répondre à un
            questionnaire portant sur différents aspects de la location, puis au
            locataire de partager la référence obtenue.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
