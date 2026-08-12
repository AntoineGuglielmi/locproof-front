/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import { Button } from '@/shared/components/shadcn/ui/button'
import Link from 'next/link'
import { Narrow } from '@/shared/components/layout/grid'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction py-20 md:py-28', {
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

export default function CallToAction({
  className,
  variant,
}: CallToActionProps) {
  return (
    <Narrow className={cn(CallToActionVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gray-900 px-6 py-14 md:px-12 md:py-16 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
          Étude terrain
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Professionnel de l'immobilier ?
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          LocProof est actuellement en phase de validation auprès des
          professionnels du secteur. Votre retour peut contribuer directement à
          orienter la suite du projet.
        </p>

        <Button
          asChild
          className="mt-8 px-8 py-6 text-base rounded-xl bg-white text-gray-900 hover:bg-gray-100"
        >
          <Link href="/survey">Participer à l'étude terrain</Link>
        </Button>

        <p className="mt-4 text-sm text-gray-400">
          Le questionnaire prend environ 3 à 5 minutes.
        </p>
      </MotionDiv>
    </Narrow>
  )
}
