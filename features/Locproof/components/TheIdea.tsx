/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Panel from '@/shared/components/text/panel'

type TheIdeaProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheIdeaVariants = cva('TheIdea py-20 md:py-28', {
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
    <section className={cn(TheIdeaVariants({ variant, className }))}>
      <div className="max-w-5xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>L'idée</SectionLabel>

          <div className="grid md:grid-cols-[1fr_0.8fr] gap-12 md:gap-20 items-start">
            <div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                Ajouter une information qui manque aujourd'hui au dossier.
              </h2>

              <div className="mt-7 space-y-5 text-gray-600 leading-relaxed">
                <p>
                  LocProof s'inspire d'un principe simple : de la même manière
                  qu'une recommandation professionnelle peut valoriser un
                  candidat à l'embauche, une référence locative pourrait
                  permettre à un locataire de mettre en avant son expérience
                  passée.
                </p>

                <p>
                  Le principe est volontairement simple : le locataire sollicite
                  son ancien bailleur, qui répond directement à quelques
                  questions sur la location.
                </p>

                <p>
                  Le locataire peut ensuite joindre cette référence à ses
                  futures candidatures.
                </p>
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
      </div>
    </section>
  )
}
