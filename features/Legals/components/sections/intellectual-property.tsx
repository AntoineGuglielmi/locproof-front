import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type IntellectualPropertyProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const IntellectualPropertyVariants = cva('IntellectualProperty', {
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

export default function IntellectualProperty({
  className,
  variant,
}: IntellectualPropertyProps) {
  return (
    <Section
      className={cn(IntellectualPropertyVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Propriété intellectuelle</SectionLabel>

        <SectionTitle>Les contenus de LocProof</SectionTitle>

        <TextBody>
          Les textes, éléments graphiques, logos, interfaces, composants et
          autres éléments constitutifs du site LocProof sont protégés par les
          règles applicables en matière de propriété intellectuelle. Toute
          reproduction ou utilisation non autorisée de ces éléments est
          susceptible de constituer une atteinte aux droits de leur titulaire.
        </TextBody>
      </MotionDiv>
    </Section>
  )
}
