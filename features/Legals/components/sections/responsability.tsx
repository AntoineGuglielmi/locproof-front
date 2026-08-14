import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type ResponsabilityProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ResponsabilityVariants = cva(
  'Responsability FullWidth border-y bg-white',
  {
    variants: {
      variant: {
        default: '',
        other: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export default function Responsability({
  className,
  variant,
}: ResponsabilityProps) {
  return (
    <Section className={cn(ResponsabilityVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Responsabilité</SectionLabel>

        <SectionTitle>Utilisation du service</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Les utilisateurs restent responsables des informations et contenus
            qu’ils transmettent via LocProof.
          </TextBody>

          <TextBody>
            LocProof s’efforce d’assurer le bon fonctionnement du service et de
            maintenir des informations fiables. Toutefois, aucune plateforme ne
            peut garantir l’absence totale d’erreurs, d’interruption de service
            ou d’informations inexactes communiquées par ses utilisateurs.
          </TextBody>

          <TextBody>
            Les recommandations doivent rester factuelles, respectueuses et
            directement liées à l’expérience locative concernée.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
