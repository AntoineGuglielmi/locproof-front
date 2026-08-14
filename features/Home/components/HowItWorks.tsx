/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import { TypeHowItWorksStep } from '../types/TypeHowItWorksStep'
import List from '@/shared/components/list/List'
import HowItWorksItem from './how-it-works-item'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type HomItWorksProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HomItWorksVariants = cva('HowItWorks FullWidth gap-y-14', {
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

export default function HowItWorks({ className, variant }: HomItWorksProps) {
  const steps: Array<TypeHowItWorksStep> = [
    {
      number: '01',
      title: 'Vous demandez une référence',
      description:
        'Vous renseignez vos informations et invitez votre ancien ou actuel bailleur à témoigner de son expérience.',
    },
    {
      number: '02',
      title: 'Votre bailleur répond',
      description:
        'Il reçoit une invitation par e-mail et répond à quelques questions simples sur votre location.',
    },
    {
      number: '03',
      title: 'Vous obtenez votre référence',
      description:
        'La réponse est structurée afin de pouvoir être présentée dans le cadre de vos futures recherches de logement.',
    },
  ]

  return (
    <Section
      size="standard"
      className={cn(HomItWorksVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <SectionLabel>Comment ça marche ?</SectionLabel>

        <SectionTitle>Une démarche simple, des deux côtés.</SectionTitle>

        <TextBody>
          Quelques étapes suffisent pour obtenir une référence basée sur
          l'expérience réelle de votre bailleur.
        </TextBody>
      </MotionDiv>

      <List
        items={steps}
        getKey={(item) => item.number}
        renderItem={HowItWorksItem}
        className="grid md:grid-cols-3 gap-8 Breakout"
      />
    </Section>
  )
}
