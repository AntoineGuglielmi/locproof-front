/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import { FullWidth } from '@/shared/components/layout/grid'
import Panel from '@/shared/components/text/panel'

type CurrentStateProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CurrentStateVariants = cva(
  'CurrentState border-y bg-white px-6 py-20 md:py-28',
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

function ProgressItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-gray-50 px-5 py-4">
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700"
      >
        ✓
      </span>

      <span className="pt-0.5 text-sm font-medium leading-relaxed text-gray-700">
        {children}
      </span>
    </div>
  )
}

export default function CurrentState({
  className,
  variant,
}: CurrentStateProps) {
  return (
    <FullWidth className={cn(CurrentStateVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Où en est le projet ?</SectionLabel>

        <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Un premier prototype permet déjà de tester l'idée.
        </h2>

        <div className="mt-8 max-w-3xl space-y-5 text-gray-600 leading-relaxed">
          <p>
            Un premier prototype est aujourd'hui opérationnel et permet de
            réaliser l'ensemble du parcours imaginé :
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <ProgressItem>
            Création d'une demande de référence par un locataire
          </ProgressItem>

          <ProgressItem>Invitation du bailleur par e-mail</ProgressItem>

          <ProgressItem>
            Réponse du bailleur via un questionnaire structuré
          </ProgressItem>

          <ProgressItem>
            Restitution d'une référence exploitable par le locataire
          </ProgressItem>
        </div>

        <Panel
          className="mt-10"
          type="warning"
          title="Un prototype, par définition, reste à renforcer."
          body="Certains points doivent encore évoluer afin de garantir un niveau de
            confiance suffisant pour un usage professionnel, notamment autour de
            la vérification des informations transmises."
        />
      </MotionDiv>
    </FullWidth>
  )
}
