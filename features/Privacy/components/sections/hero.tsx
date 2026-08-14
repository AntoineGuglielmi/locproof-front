import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

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
        <SectionLabel>Protection des données</SectionLabel>

        <PageMainTitle className="mt-4">
          Politique de confidentialité
        </PageMainTitle>

        <PageSubTitle className="mt-6 max-w-3xl">
          Comprendre quelles données sont utilisées par LocProof, pourquoi elles
          le sont et quelles informations peuvent être visibles.
        </PageSubTitle>

        <TextBody className="mt-6 max-w-2xl">
          Dernière mise à jour : 14 août 2026
        </TextBody>
      </MotionDiv>
    </Section>
  )
}
