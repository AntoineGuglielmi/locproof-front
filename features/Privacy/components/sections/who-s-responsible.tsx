import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import Link from 'next/link'

type WhoSResponsibleProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const WhoSResponsibleVariants = cva('WhoSResponsible', {
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

export default function WhoSResponsible({
  className,
  variant,
}: WhoSResponsibleProps) {
  return (
    <Section
      which="bottomOnly"
      className={cn(WhoSResponsibleVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Responsable du traitement</SectionLabel>

        <SectionTitle>Qui est responsable de vos données ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof est un projet indépendant édité par{' '}
            <strong className="font-medium text-gray-900">
              Antoine Guglielmi
            </strong>
            .
          </TextBody>

          <TextBody>
            Pour toute question concernant vos données personnelles ou
            l’exercice de vos droits, vous pouvez nous contacter à :
          </TextBody>

          <Link
            href="mailto:contact@locproof.fr"
            className="inline-block font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            contact@locproof.fr
          </Link>
        </div>
      </MotionDiv>
    </Section>
  )
}
