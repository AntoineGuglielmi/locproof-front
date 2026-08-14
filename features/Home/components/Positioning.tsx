/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import Link from 'next/link'
import Button from '@/shared/components/form/button'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type PositioningProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const PositioningVariants = cva('Positioning text-center', {
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
    <Section
      size="standard"
      className={cn(PositioningVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Une information complémentaire</SectionLabel>

        <SectionTitle>
          Pas un nouveau dossier.
          <br />
          Une autre façon de se présenter.
        </SectionTitle>

        <TextBody>
          LocProof n'a pas vocation à remplacer les justificatifs habituels d'un
          dossier de location. L'objectif est d'y ajouter une information
          qualitative qui est aujourd'hui difficile à transmettre : l'expérience
          passée du locataire.
        </TextBody>

        <Button
          asChild
          variant="outline"
          className="mt-8"
        >
          <Link href="/locproof">En savoir plus sur le projet</Link>
        </Button>
      </MotionDiv>
    </Section>
  )
}
