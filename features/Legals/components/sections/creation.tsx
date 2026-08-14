import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import Link from 'next/link'

type CreationProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CreationVariants = cva('Creation', {
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

export default function Creation({ className, variant }: CreationProps) {
  return (
    <Section
      which="bottomOnly"
      size="standard"
      className={cn(CreationVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Éditeur</SectionLabel>

        <SectionTitle>Qui édite LocProof ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof est un projet indépendant édité par Antoine Guglielmi.
          </TextBody>

          <TextBody>
            Pour toute question concernant le site ou le service, vous pouvez
            nous contacter à l’adresse suivante :
          </TextBody>

          <Link
            href="mailto:contact@locproof.fr"
            className="inline-block font-medium text-indigo-600 hover:text-indigo-700"
          >
            contact@locproof.fr
          </Link>
        </div>
      </MotionDiv>
    </Section>
  )
}
