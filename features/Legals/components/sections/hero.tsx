import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'

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
        <SectionLabel>Informations légales</SectionLabel>

        <PageMainTitle className="mt-4">Mentions légales</PageMainTitle>

        <PageSubTitle className="mt-6 max-w-3xl text-xl md:text-2xl">
          Les informations relatives à l’éditeur, à l’hébergement et au
          fonctionnement de LocProof.
        </PageSubTitle>
      </MotionDiv>
    </Section>
  )
}
