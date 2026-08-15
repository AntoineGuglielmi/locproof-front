import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import Link from 'next/link'

type ConservationProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ConservationVariants = cva('Conservation', {
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

export default function Conservation({
  className,
  variant,
}: ConservationProps) {
  return (
    <Section className={cn(ConservationVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Conservation</SectionLabel>

        <SectionTitle>
          Combien de temps les données sont-elles conservées ?
        </SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Les données nécessaires aux profils et aux références sont
            conservées tant qu’elles restent nécessaires au fonctionnement du
            service.
          </TextBody>

          <TextBody>
            Les mécanismes temporaires utilisés pour les vérifications et
            validations ont en revanche une durée de validité limitée.
          </TextBody>

          <TextBody>
            À ce jour, la suppression automatique des profils et des références
            arrivées en fin de vie n’est pas systématiquement implémentée.
          </TextBody>

          <TextBody>
            Si vous souhaitez demander la suppression de vos données, vous
            pouvez nous contacter à{' '}
            <Link
              href="mailto:contact@locproof.fr"
              className="font-medium text-indigo-600 transition-colors hover:text-indigo-700"
            >
              contact@locproof.fr
            </Link>
            .
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
