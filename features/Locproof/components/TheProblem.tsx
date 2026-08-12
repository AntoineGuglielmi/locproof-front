/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import { FullWidth } from '@/shared/components/layout/grid'

type TheProblemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheProblemVariants = cva('TheProblem border-y bg-white py-20 md:py-24', {
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

function Question({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-gray-50 px-5 py-4">
      <p className="text-sm font-medium leading-relaxed text-gray-700">
        {children}
      </p>
    </div>
  )
}

export default function TheProblem({ className, variant }: TheProblemProps) {
  return (
    <FullWidth className={cn(TheProblemVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le constat</SectionLabel>

        <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Un dossier permet d'évaluer une situation. Pas forcément une
          expérience.
        </h2>

        <div className="mt-8 max-w-3xl space-y-5 text-gray-600 leading-relaxed">
          <p>
            Lorsqu'un locataire constitue un dossier de location, il peut
            fournir de nombreux justificatifs : revenus, contrat de travail,
            garant, avis d'imposition...
          </p>

          <p>
            Ces documents permettent au bailleur d'évaluer la situation
            financière et professionnelle du candidat. En revanche, ils ne
            permettent pas réellement de savoir comment celui-ci s'est comporté
            lors de ses précédentes locations.
          </p>

          <p>
            Pourtant, un précédent bailleur est souvent la personne la mieux
            placée pour répondre à des questions très concrètes :
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl">
          <Question>Les loyers étaient-ils payés régulièrement ?</Question>

          <Question>Le logement a-t-il été entretenu correctement ?</Question>

          <Question>
            Les échanges étaient-ils respectueux et constructifs ?
          </Question>

          <Question>
            Recommanderiez-vous ce locataire à un autre bailleur ?
          </Question>
        </div>

        <p className="mt-10 max-w-3xl text-lg font-medium text-gray-900">
          Cette information existe, mais elle est rarement accessible ou
          formalisée.
        </p>
      </MotionDiv>
    </FullWidth>
  )
}
