import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type SecuredLinksProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const SecuredLinksVariants = cva('SecuredLinks FullWidth border-y bg-gray-50', {
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

export default function SecuredLinks({
  className,
  variant,
}: SecuredLinksProps) {
  return (
    <Section className={cn(SecuredLinksVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Sécurité</SectionLabel>

        <SectionTitle>Les liens de validation sont temporaires</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof utilise des liens temporaires pour sécuriser certaines
            étapes du parcours.
          </TextBody>

          <TextBody>
            Le lien permettant de vérifier l’adresse e-mail d’un locataire est
            valable pendant <strong>24 heures</strong>.
          </TextBody>

          <TextBody>
            Le lien envoyé à un bailleur pour répondre à une demande de
            référence est valable pendant <strong>7 jours</strong>.
          </TextBody>

          <TextBody>
            Une fois leur période de validité dépassée, ces liens ne permettent
            plus d’accéder au parcours correspondant.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
