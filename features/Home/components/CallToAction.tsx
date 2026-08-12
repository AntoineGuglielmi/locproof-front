/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Narrow } from '@/shared/components/layout/grid'
import Link from 'next/link'
import MotionDiv from '@/shared/components/layout/motion-div'
import Button from '@/shared/components/form/button'
import TextBody from '@/shared/components/text/text-body'

type CallToActionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CallToActionVariants = cva(
  'CallToAction mb-20 md:mb-28 rounded-3xl bg-gray-900 px-6 py-16 md:px-12 md:py-20 text-center',
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
        className="flex flex-col gap-5 items-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Votre expérience de locataire mérite aussi d'être prise en compte.
        </h2>

        <TextBody className="text-gray-300 text-balance">
          Demandez une référence à votre ancien bailleur et ajoutez une nouvelle
          dimension à votre prochain dossier de location.
        </TextBody>

        <Button
          asChild
          variant="outlineDarker"
          className="mt-3"
        >
          <Link href="/validate-email">Obtenir ma référence</Link>
        </Button>
      </MotionDiv>
    </Narrow>
  )
}
