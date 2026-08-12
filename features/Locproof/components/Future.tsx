/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import { FullWidth } from '@/shared/components/layout/grid'

type FutureProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const FutureVariants = cva('Future border-y bg-gray-50 px-6 py-20 md:py-28', {
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

function FutureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white px-5 py-4">
      <span
        aria-hidden="true"
        className="mt-1 size-2 shrink-0 rounded-full bg-indigo-500"
      />

      <span className="text-sm leading-relaxed text-gray-700">{children}</span>
    </div>
  )
}

export default function Future({ className, variant }: FutureProps) {
  return (
    <FullWidth className={cn(FutureVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Les suites envisagées</SectionLabel>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Construire LocProof étape par étape.
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed">
          Si les retours du terrain confirment l'intérêt du concept, plusieurs
          évolutions pourront être envisagées.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <FutureItem>
            Renforcer la vérification de l'identité des bailleurs
          </FutureItem>

          <FutureItem>
            Sécuriser davantage les échanges et les références
          </FutureItem>

          <FutureItem>
            Expérimenter la solution auprès de professionnels de l'immobilier
          </FutureItem>

          <FutureItem>
            Faire évoluer progressivement le service selon les besoins
            identifiés
          </FutureItem>
        </div>

        <p className="mt-10 text-lg font-medium leading-relaxed text-gray-900">
          L'objectif est de construire LocProof étape par étape, en validant
          chaque évolution auprès des utilisateurs concernés.
        </p>
      </MotionDiv>
    </FullWidth>
  )
}
