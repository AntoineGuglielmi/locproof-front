/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import { TypeFuturItem } from '../types/TypeFuturItem'
import List from '@/shared/components/list/List'

type FutureProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const FutureVariants = cva('Future FullWidth border-y bg-gray-50', {
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

function FutureItem({ futur }: TypeFuturItem) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white px-5 py-4">
      <span
        aria-hidden="true"
        className="mt-1 size-2 shrink-0 rounded-full bg-indigo-500"
      />

      <span className="text-sm leading-relaxed text-gray-700">{futur}</span>
    </div>
  )
}

export default function Future({ className, variant }: FutureProps) {
  const futureItems: Array<TypeFuturItem> = [
    { futur: "Renforcer la vérification de l'identité des bailleurs" },
    { futur: 'Sécuriser davantage les échanges et les références' },
    {
      futur:
        "Expérimenter la solution auprès de professionnels de l'immobilier",
    },
    {
      futur:
        'Faire évoluer progressivement le service selon les besoins identifiés',
    },
  ]

  return (
    <Section className={cn(FutureVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Les suites envisagées</SectionLabel>

        <SectionTitle>Construire LocProof étape par étape.</SectionTitle>

        <TextBody>
          Si les retours du terrain confirment l'intérêt du concept, plusieurs
          évolutions pourront être envisagées.
        </TextBody>

        <List
          items={futureItems}
          renderItem={FutureItem}
          getKey={(_, index) => index}
          className="mt-10 grid md:grid-cols-2 gap-4"
        />

        <p className="mt-10 text-lg font-medium leading-relaxed text-gray-900">
          L'objectif est de construire LocProof étape par étape, en validant
          chaque évolution auprès des utilisateurs concernés.
        </p>
      </MotionDiv>
    </Section>
  )
}
