/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import Panel from '@/shared/components/text/panel'
import Section from '@/shared/components/layout/section'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import { TypeProgress } from '../types/TypeProgress'
import List from '@/shared/components/list/List'

type CurrentStateProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CurrentStateVariants = cva('CurrentState grid-full border-y bg-white', {
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

function ProgressItem({ progress }: TypeProgress) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-gray-50 px-5 py-4">
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700"
      >
        ✓
      </span>

      <span className="pt-0.5 text-sm font-medium leading-relaxed text-gray-700">
        {progress}
      </span>
    </div>
  )
}

export default function CurrentState({
  className,
  variant,
}: CurrentStateProps) {
  const progressItems: Array<TypeProgress> = [
    { progress: "Création d'une demande de référence par un locataire" },
    { progress: 'Invitation du bailleur par e-mail' },
    { progress: 'Réponse du bailleur via un questionnaire structuré' },
    { progress: "Restitution d'une référence exploitable par le locataire" },
  ]

  return (
    <Section className={cn(CurrentStateVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Où en est le projet ?</SectionLabel>

        <SectionTitle>
          Un premier prototype permet déjà de tester l'idée.
        </SectionTitle>

        <TextBody>
          Un premier prototype est aujourd'hui opérationnel et permet de
          réaliser l'ensemble du parcours imaginé :
        </TextBody>

        <List
          items={progressItems}
          renderItem={ProgressItem}
          getKey={(_, index) => index}
          className="mt-10 grid sm:grid-cols-2 gap-4"
        />

        <Panel
          className="mt-10"
          type="warning"
          title="Un prototype, par définition, reste à renforcer."
          body="Certains points doivent encore évoluer afin de garantir un niveau de
            confiance suffisant pour un usage professionnel, notamment autour de
            la vérification des informations transmises."
        />
      </MotionDiv>
    </Section>
  )
}
