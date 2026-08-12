/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Breakout, FullWidth } from '@/shared/components/layout/grid'
import MotionDiv from '@/shared/components/layout/motion-div'

type HomItWorksProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HomItWorksVariants = cva('HowItWorks py-20 md:py-28', {
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
  const steps = [
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
    <FullWidth className={cn(HomItWorksVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Comment ça marche ?
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Une démarche simple, des deux côtés.
        </h2>
        <p className="mt-5 text-gray-600">
          Quelques étapes suffisent pour obtenir une référence basée sur
          l'expérience réelle de votre bailleur.
        </p>
      </MotionDiv>

      <Breakout className="mt-14 grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <MotionDiv
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="text-5xl font-semibold tracking-tight text-indigo-100">
              {step.number}
            </div>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {step.title}
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </MotionDiv>
        ))}
      </Breakout>
    </FullWidth>
  )
}
