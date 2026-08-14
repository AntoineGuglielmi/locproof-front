import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type CookiesProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CookiesVariants = cva('Cookies FullWidth border-y bg-gray-50', {
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

export default function Cookies({ className, variant }: CookiesProps) {
  return (
    <Section className={cn(CookiesVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Cookies</SectionLabel>

        <SectionTitle>Cookies et stockage local</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof n’utilise actuellement pas de cookies publicitaires ou de
            cookies destinés au suivi comportemental.
          </TextBody>

          <TextBody>
            Le service utilise toutefois un cookie technique nécessaire à
            certains parcours de vérification.
          </TextBody>

          <TextBody>
            Ce cookie permet notamment de conserver temporairement le contexte
            du locataire après la validation de son adresse e-mail.
          </TextBody>

          <TextBody>
            Il est configuré comme cookie <code>HttpOnly</code>, avec une durée
            de validité limitée.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
