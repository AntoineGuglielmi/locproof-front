/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import { Button } from '@/shared/components/shadcn/ui/button'
import Link from 'next/link'

type PositioningProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const PositioningVariants = cva('Positioning py-20 md:py-28', {
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

export default function Positioning({ className, variant }: PositioningProps) {
  return (
    <section className={cn(PositioningVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Une information complémentaire
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Pas un nouveau dossier.
          <br />
          Une autre façon de se présenter.
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed">
          LocProof n'a pas vocation à remplacer les justificatifs habituels d'un
          dossier de location. L'objectif est d'y ajouter une information
          qualitative qui est aujourd'hui difficile à transmettre : l'expérience
          passée du locataire.
        </p>

        <Button
          asChild
          variant="outline"
          className="mt-8 rounded-xl"
        >
          <Link href="/locproof">En savoir plus sur le projet</Link>
        </Button>
      </MotionDiv>
    </section>
  )
}
