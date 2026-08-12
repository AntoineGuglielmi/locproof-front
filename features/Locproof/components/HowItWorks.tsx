/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import { Breakout, FullWidth } from '@/shared/components/layout/grid'

type HowItWorksProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HowItWorksVariants = cva(
  'HowItWorks border-y bg-gray-50 px-6 py-20 md:py-28',
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

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div>
      <div className="text-5xl font-semibold tracking-tight text-indigo-100">
        {number}
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function HowItWorks({ className, variant }: HowItWorksProps) {
  return (
    <FullWidth className={cn(HowItWorksVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le principe</SectionLabel>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Une référence construite à partir de l'expérience du bailleur.
        </h2>

        <p className="mt-5 text-gray-600 leading-relaxed">
          Le parcours imaginé par LocProof tient en quelques étapes.
        </p>
      </MotionDiv>

      <Breakout className="mt-14 grid md:grid-cols-3 gap-8">
        <Step
          number="01"
          title="Le locataire fait une demande"
          description="Il renseigne les informations nécessaires et invite son ancien ou actuel bailleur à fournir une référence."
        />

        <Step
          number="02"
          title="Le bailleur répond"
          description="Il reçoit une invitation par e-mail et répond à un questionnaire structuré portant sur son expérience de la location."
        />

        <Step
          number="03"
          title="La référence est restituée"
          description="Le locataire dispose d'une référence exploitable qu'il peut présenter dans le cadre de ses futures recherches de logement."
        />
      </Breakout>
    </FullWidth>
  )
}
