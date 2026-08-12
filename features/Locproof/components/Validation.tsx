/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'

type ValidationProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ValidationVariants = cva('Validation py-20 md:py-28', {
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

function ResearchQuestion({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white px-5 py-5">
      <p className="text-sm leading-relaxed text-gray-700">{children}</p>
    </div>
  )
}

export default function Validation({ className, variant }: ValidationProps) {
  return (
    <section className={cn(ValidationVariants({ variant, className }))}>
      <div className="max-w-5xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Une phase de validation</SectionLabel>

          <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Maintenant, il faut confronter l'idée au terrain.
          </h2>

          <div className="mt-8 max-w-3xl space-y-5 text-gray-600 leading-relaxed">
            <p>
              Le prototype permet aujourd'hui de concrétiser l'idée et de tester
              un premier parcours utilisateur. La prochaine étape est désormais
              de comprendre si cette solution peut apporter une réelle valeur
              aux professionnels de l'immobilier dans leur quotidien.
            </p>

            <p>
              L'objectif n'est pas de confirmer une idée à tout prix, mais de
              comprendre les usages pertinents, les attentes et les éventuels
              freins à son adoption.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <ResearchQuestion>
              Une référence locative peut-elle faciliter l'étude d'un dossier ?
            </ResearchQuestion>

            <ResearchQuestion>
              Dans quelles situations pourrait-elle être utile ?
            </ResearchQuestion>

            <ResearchQuestion>
              Quelles informations sont réellement pertinentes pour un
              professionnel ?
            </ResearchQuestion>

            <ResearchQuestion>
              Quels freins pourraient limiter son utilisation ?
            </ResearchQuestion>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
