/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import List from '@/shared/components/list/List'
import TextBody from '@/shared/components/text/text-body'

type TheProblemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheProblemVariants = cva('TheProblem border-y bg-white FullWidth', {
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

function Question({ question }: { question: string }) {
  return (
    <div className="rounded-xl border bg-gray-50 px-5 py-4">
      <p className="text-sm font-medium leading-relaxed text-gray-700">
        {question}
      </p>
    </div>
  )
}

export default function TheProblem({ className, variant }: TheProblemProps) {
  const questions = [
    { question: 'Les loyers étaient-ils payés régulièrement ?' },
    { question: 'Le logement a-t-il été entretenu correctement ?' },
    { question: 'Les échanges étaient-ils respectueux et constructifs ?' },
    { question: 'Recommanderiez-vous ce locataire à un autre bailleur ?' },
  ]

  return (
    <Section className={cn(TheProblemVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le constat</SectionLabel>

        <SectionTitle>
          Un dossier permet d'évaluer une situation. Pas forcément une
          expérience.
        </SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Lorsqu'un locataire constitue un dossier de location, il peut
            fournir de nombreux justificatifs : revenus, contrat de travail,
            garant, avis d'imposition...
          </TextBody>

          <TextBody>
            Ces documents permettent au bailleur d'évaluer la situation
            financière et professionnelle du candidat. En revanche, ils ne
            permettent pas réellement de savoir comment celui-ci s'est comporté
            lors de ses précédentes locations.
          </TextBody>

          <TextBody>
            Pourtant, un précédent bailleur est souvent la personne la mieux
            placée pour répondre à des questions très concrètes :
          </TextBody>
        </div>

        <List
          items={questions}
          renderItem={Question}
          getKey={(_, index) => index}
          className="mt-10 grid sm:grid-cols-2 gap-4"
        />

        <p className="mt-10 text-lg font-medium text-gray-900">
          Cette information existe, mais elle est rarement accessible ou
          formalisée.
        </p>
      </MotionDiv>
    </Section>
  )
}
