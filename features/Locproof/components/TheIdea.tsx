/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Panel from '@/shared/components/text/panel'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type TheIdeaProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheIdeaVariants = cva('TheIdea', {
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

export default function TheIdea({ className, variant }: TheIdeaProps) {
  return (
    <Section className={cn(TheIdeaVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>L'idée</SectionLabel>

        <div className="grid md:grid-cols-[1fr_0.8fr] gap-12 md:gap-20 items-start">
          <div>
            <SectionTitle>
              Ajouter une information qui manque aujourd'hui au dossier.
            </SectionTitle>

            <div className="space-y-5">
              <TextBody>
                LocProof s'inspire d'un principe simple : de la même manière
                qu'une recommandation professionnelle peut valoriser un candidat
                à l'embauche, une référence locative pourrait permettre à un
                locataire de mettre en avant son expérience passée.
              </TextBody>

              <TextBody>
                Le principe est volontairement simple : le locataire sollicite
                son ancien bailleur, qui répond directement à quelques questions
                sur la location.
              </TextBody>

              <TextBody>
                Le locataire peut ensuite joindre cette référence à ses futures
                candidatures.
              </TextBody>
            </div>
          </div>

          <Panel
            title="L'objectif"
            body="Ne pas remplacer les pièces habituelles d'un dossier de
                location, mais y ajouter une information qualitative qui fait
                aujourd'hui défaut."
            type="neutral"
          />
        </div>
      </MotionDiv>
    </Section>
  )
}
