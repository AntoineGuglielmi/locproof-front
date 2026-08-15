import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import TextBodyList from '@/shared/components/list/text-body-list'

type VisibilityProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const VisibilityVariants = cva('Visibility', {
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

export default function Visibility({ className, variant }: VisibilityProps) {
  const featuredDate = [
    { body: 'le prénom et le nom du locataire' },
    { body: 'les villes correspondant aux locations référencées' },
    { body: 'les périodes de location' },
    { body: 'le nombre de références' },
    { body: 'une synthèse des réponses des bailleurs' },
    { body: 'les commentaires associés aux références' },
  ]

  return (
    <Section className={cn(VisibilityVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Visibilité</SectionLabel>

        <SectionTitle>
          Quelles informations sont visibles sur un profil public ?
        </SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Lorsqu’un profil LocProof est rendu accessible, certaines
            informations relatives aux expériences locatives peuvent être
            consultées.
          </TextBody>

          <TextBody>Le profil peut notamment présenter :</TextBody>

          <TextBodyList items={featuredDate} />

          <TextBody>
            En revanche, les informations suivantes ne sont pas destinées à être
            affichées sur le profil public :
          </TextBody>

          <TextBodyList
            items={[
              { body: 'les adresses e-mail' },
              { body: 'les adresses complètes des logements' },
              { body: 'les jetons utilisés pour les liens de validation' },
              { body: 'les identifiants internes utilisés par le service' },
            ]}
          />

          <TextBody>
            Le locataire reste responsable du partage de son profil et de la
            diffusion du lien permettant d’y accéder.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
