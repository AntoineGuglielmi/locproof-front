/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import { TypeResearchQuestion } from '../types/TypeResearchQuestion'
import List from '@/shared/components/list/List'

type ValidationProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ValidationVariants = cva('Validation', {
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

function ResearchQuestion({ question }: TypeResearchQuestion) {
  return (
    <div className="rounded-xl border bg-white px-5 py-5">
      <p className="text-sm leading-relaxed text-gray-700">{question}</p>
    </div>
  )
}

export default function Validation({ className, variant }: ValidationProps) {
  const researchQuestions: Array<TypeResearchQuestion> = [
    {
      question:
        "Une référence locative peut-elle faciliter l'étude d'un dossier ?",
    },
    { question: 'Dans quelles situations pourrait-elle être utile ?' },
    {
      question:
        'Quelles informations sont réellement pertinentes pour un professionnel ?',
    },
    { question: 'Quels freins pourraient limiter son utilisation ?' },
  ]

  return (
    <Section className={cn(ValidationVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Une phase de validation</SectionLabel>

        <SectionTitle>
          Maintenant, il faut confronter l'idée au terrain.
        </SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Le prototype permet aujourd'hui de concrétiser l'idée et de tester
            un premier parcours utilisateur. La prochaine étape est désormais de
            comprendre si cette solution peut apporter une réelle valeur aux
            professionnels de l'immobilier dans leur quotidien.
          </TextBody>

          <TextBody>
            L'objectif n'est pas de confirmer une idée à tout prix, mais de
            comprendre les usages pertinents, les attentes et les éventuels
            freins à son adoption.
          </TextBody>
        </div>

        <List
          items={researchQuestions}
          renderItem={ResearchQuestion}
          getKey={(_, index) => index}
          className="mt-10 grid md:grid-cols-2 gap-4"
        />
      </MotionDiv>
    </Section>
  )
}
