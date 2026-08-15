/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type WhatIsEvaluatedProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const WhatIsEvaluatedVariants = cva(
  'WhatIsEvaluated grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20',
  {
    variants: {
      variant: {
        default: '',
        other: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function ReferencePoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-white px-5 py-4 shadow-sm">
      <p className="font-medium mb-1 text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}

export default function WhatIsEvaluated({
  className,
  variant,
}: WhatIsEvaluatedProps) {
  return (
    <Section className={cn(WhatIsEvaluatedVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>La référence</SectionLabel>

        <SectionTitle>Des questions concrètes sur la location.</SectionTitle>

        <TextBody>
          Le questionnaire porte sur les aspects de la relation locative qui
          peuvent difficilement être évalués à partir des documents habituels
          d'un dossier.
        </TextBody>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <ReferencePoint
          title="Paiement des loyers"
          description="Les loyers ont-ils été réglés régulièrement ?"
        />

        <ReferencePoint
          title="Entretien du logement"
          description="Le logement a-t-il été correctement entretenu ?"
        />

        <ReferencePoint
          title="Communication"
          description="Les échanges avec le bailleur se sont-ils bien déroulés ?"
        />

        <ReferencePoint
          title="Recommandation"
          description="Le bailleur recommanderait-il ce locataire ?"
        />
      </MotionDiv>
    </Section>
  )
}
