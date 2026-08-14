import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type HostingProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HostingVariants = cva('Hosting FullWidth border-y bg-white', {
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

export default function Hosting({ className, variant }: HostingProps) {
  return (
    <Section className={cn(HostingVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Hébergement</SectionLabel>

        <SectionTitle>Où est hébergé le service ?</SectionTitle>

        <TextBody>
          Le site et les services de LocProof sont hébergés par{' '}
          <strong className="font-medium text-gray-900">02Switch</strong>, dont
          le siège social est situé{' '}
          <strong className="font-medium text-gray-900">
            Chem. des Pardiaux, 63000 Clermont-Ferrand
          </strong>
          .
        </TextBody>
      </MotionDiv>
    </Section>
  )
}
