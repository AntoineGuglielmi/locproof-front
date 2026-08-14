/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'

type HeroProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HeroVariants = cva('Hero', {
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

export default function Hero({ className, variant }: HeroProps) {
  return (
    <Section
      size="large"
      which="bottomOnly"
      className={cn(HeroVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>À propos de LocProof</SectionLabel>

        <PageMainTitle className="mt-4">
          Donner plus de valeur à l'expérience d'un bon locataire.
        </PageMainTitle>

        <PageSubTitle className="mt-6 text-xl md:text-2xl text-gray-700">
          LocProof est un projet visant à permettre aux locataires de faire
          valoir leur expérience locative grâce au témoignage de leur ancien ou
          actuel bailleur.
        </PageSubTitle>
      </MotionDiv>
    </Section>
  )
}
