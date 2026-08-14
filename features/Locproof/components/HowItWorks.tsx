/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import { TypeStep } from '../types/TypeStep'
import List from '@/shared/components/list/List'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type HowItWorksProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HowItWorksVariants = cva('HowItWorks FullWidth border-y bg-gray-50 ', {
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

function Step({ number, title, description }: TypeStep) {
  return (
    <div>
      <div className="text-5xl mb-4 font-semibold tracking-tight text-indigo-100">
        {number}
      </div>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>

      <TextBody>{description}</TextBody>
    </div>
  )
}

export default function HowItWorks({ className, variant }: HowItWorksProps) {
  const steps: Array<TypeStep> = [
    {
      number: '01',
      title: 'Le locataire fait une demande',
      description:
        'Il renseigne les informations nécessaires et invite son ancien ou actuel bailleur à fournir une référence.',
    },
    {
      number: '02',
      title: 'Le bailleur répond',
      description:
        'Il reçoit une invitation par e-mail et répond à un questionnaire structuré portant sur son expérience de la location.',
    },
    {
      number: '03',
      title: 'La référence est restituée',
      description:
        "Le locataire dispose d'une référence exploitable qu'il peut présenter dans le cadre de ses futures recherches de logement.",
    },
  ]

  return (
    <Section className={cn(HowItWorksVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le principe</SectionLabel>

        <SectionTitle>
          Une référence construite à partir de l'expérience du bailleur.
        </SectionTitle>

        <TextBody>
          Le parcours imaginé par LocProof tient en quelques étapes.
        </TextBody>
      </MotionDiv>

      <List
        items={steps}
        renderItem={Step}
        getKey={(step) => step.number}
        className="Breakout mt-14 grid md:grid-cols-3 gap-8"
      />
    </Section>
  )
}
