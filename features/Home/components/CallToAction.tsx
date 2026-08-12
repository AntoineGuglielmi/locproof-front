/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Narrow } from '@/shared/components/layout/grid'
import { Button } from '@/shared/components/shadcn/ui/button'
import Link from 'next/link'
import MotionDiv from '@/shared/components/layout/motion-div'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva('CallToAction pb-20 md:pb-28', {
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
        className="rounded-3xl bg-gray-900 px-6 py-16 md:px-12 md:py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Votre expérience de locataire mérite aussi d'être prise en compte.
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Demandez une référence à votre ancien bailleur et ajoutez une nouvelle
          dimension à votre prochain dossier de location.
        </p>

        <Button
          asChild
          className="mt-8 px-8 py-6 text-base rounded-xl bg-white text-gray-900 hover:bg-gray-100"
        >
          <Link href="/validate-email">Obtenir ma référence</Link>
        </Button>
      </MotionDiv>
    </Narrow>
  )
}
