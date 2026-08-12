/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { FullWidth } from '@/shared/components/layout/grid'
import MotionDiv from '@/shared/components/layout/motion-div'

type TheProblemeProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheProblemeVariants = cva(
  'TheProbleme border-y bg-white py-20 md:py-24',
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

export default function TheProbleme({ className, variant }: TheProblemeProps) {
  const criteria = [
    'Paiement régulier des loyers',
    'Entretien du logement',
    'Qualité des échanges',
    'Recommandation du locataire',
  ]

  return (
    <FullWidth className={cn(TheProblemeVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Le constat
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Un dossier ne raconte pas tout.
        </h2>

        <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Revenus, contrat de travail, avis d'imposition, garant... Un dossier
            de location rassemble de nombreuses informations pour permettre au
            bailleur d'évaluer la situation d'un candidat.
          </p>

          <p>
            Mais ces documents ne racontent pas son expérience en tant que
            locataire.
          </p>

          <p className="font-medium text-gray-900">
            Comment s'est passée sa précédente location ?
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {criteria.map((criterion, index) => (
            <MotionDiv
              key={criterion}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 rounded-xl border bg-gray-50 px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700"
              >
                ✓
              </span>

              <span className="text-sm font-medium text-gray-700">
                {criterion}
              </span>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </FullWidth>
  )
}
