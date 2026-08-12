/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'

type WhatIsEvaluatedProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const WhatIsEvaluatedVariants = cva('WhatIsEvaluated py-20 md:py-28', {
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

function ReferencePoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-white px-5 py-4 shadow-sm">
      <p className="font-medium text-gray-900">{title}</p>

      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}

export default function WhatIsEvaluated({
  className,
  variant,
}: WhatIsEvaluatedProps) {
  return (
    <section className={cn(WhatIsEvaluatedVariants({ variant, className }))}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>La référence</SectionLabel>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Des questions concrètes sur la location.
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Le questionnaire porte sur les aspects de la relation locative qui
              peuvent difficilement être évalués à partir des documents
              habituels d'un dossier.
            </p>
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
        </div>
      </div>
    </section>
  )
}
