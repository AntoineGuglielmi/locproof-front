import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import Link from 'next/link'
import TextBodyList from '@/shared/components/list/text-body-list'

type YourRightsProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const YourRightsVariants = cva('YourRights FullWidth border-y bg-gray-50', {
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

export default function YourRights({ className, variant }: YourRightsProps) {
  return (
    <Section className={cn(YourRightsVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Vos droits</SectionLabel>

        <SectionTitle>Vous gardez le contrôle de vos données.</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Conformément à la réglementation applicable en matière de protection
            des données personnelles, vous pouvez notamment demander :
          </TextBody>

          <TextBodyList
            items={[
              { body: 'l’accès aux données personnelles vous concernant' },
              { body: 'la rectification de données inexactes ' },
              {
                body: 'la suppression de vos données, lorsque celle-ci est possible',
              },
              { body: 'la limitation de certains traitements' },
              {
                body: 'la portabilité de certaines données lorsque les conditions prévues par la réglementation sont réunies',
              },
            ]}
          />

          <TextBody>
            Vous pouvez également vous opposer à certains traitements lorsque
            les conditions légales sont remplies.
          </TextBody>

          <TextBody>Pour exercer vos droits, écrivez-nous à :</TextBody>

          <Link
            href="mailto:contact@locproof.fr"
            className="inline-block font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            contact@locproof.fr
          </Link>

          <TextBody>
            Afin de protéger les données des utilisateurs, nous pouvons être
            amenés à demander des informations permettant de vérifier l’identité
            de la personne à l’origine de la demande.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
