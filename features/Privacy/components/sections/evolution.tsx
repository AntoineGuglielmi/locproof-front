import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type EvolutionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const EvolutionVariants = cva('Evolution grid-full border-y bg-gray-50', {
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

export default function Evolution({ className, variant }: EvolutionProps) {
  return (
    <Section className={cn(EvolutionVariants({ variant, className }))}>
      <MotionDiv
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Mise à jour</SectionLabel>

        <SectionTitle>Évolution de cette politique</SectionTitle>

        <TextBody>
          Cette politique peut être mise à jour afin de refléter l’évolution de
          LocProof, de ses fonctionnalités ou de ses traitements de données. La
          date de dernière mise à jour est indiquée en haut de cette page.
        </TextBody>
      </MotionDiv>
    </Section>
  )
}
