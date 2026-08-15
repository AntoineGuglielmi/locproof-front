/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import List from '@/shared/components/list/List'
import CriterionItem from './criterion-item'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type TheProblemeProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const TheProblemeVariants = cva('TheProbleme grid-full border-y bg-white', {
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

export default function TheProbleme({ className, variant }: TheProblemeProps) {
  const criteria = [
    { criterion: 'Paiement régulier des loyers' },
    { criterion: 'Entretien du logement' },
    { criterion: 'Qualité des échanges' },
    { criterion: 'Recommandation du locataire' },
  ]

  return (
    <Section
      size="standard"
      className={cn(TheProblemeVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Le constat</SectionLabel>

        <SectionTitle>Un dossier ne raconte pas tout.</SectionTitle>

        <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
          <TextBody>
            Revenus, contrat de travail, avis d'imposition, garant... Un dossier
            de location rassemble de nombreuses informations pour permettre au
            bailleur d'évaluer la situation d'un candidat.
          </TextBody>
          <TextBody>
            Mais ces documents ne racontent pas son expérience en tant que
            locataire.
          </TextBody>
          <TextBody className="font-medium text-gray-900">
            Comment s'est passée sa précédente location ?
          </TextBody>
        </div>

        <List
          items={criteria}
          renderItem={CriterionItem}
          getKey={(item) => item.criterion}
          className="mt-12 grid sm:grid-cols-2 gap-4"
        />
      </MotionDiv>
    </Section>
  )
}
