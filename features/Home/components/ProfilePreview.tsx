/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import Link from 'next/link'
import Button from '@/shared/components/form/button'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type ProfilePreviewProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ProfilePreviewVariants = cva(
  'ProfilePreview grid-full bg-gray-50 border-y',
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

function ReferenceRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-600">{label}</span>

      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-green-500"
        />
        Très satisfaisant
      </span>
    </div>
  )
}

export default function ProfilePreview({
  className,
  variant,
}: ProfilePreviewProps) {
  return (
    <Section
      size="standard"
      className={cn(ProfilePreviewVariants({ variant, className }))}
    >
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-center">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Une référence concrète</SectionLabel>

          <SectionTitle>Une information simple à comprendre.</SectionTitle>

          <TextBody>
            La référence synthétise le retour du bailleur sur les principaux
            aspects de la location afin de donner une vision complémentaire du
            profil du locataire.
          </TextBody>

          <Button
            asChild
            variant="outline"
            className="mt-8"
          >
            <Link href="/example">Voir un exemple de référence</Link>
          </Button>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Martin Dupont</p>

              <p className="mt-1 text-sm text-gray-500">Référence locative</p>
            </div>

            <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              Référence vérifiée
            </span>
          </div>

          <div className="mt-6 border-t pt-5">
            <p className="text-sm text-gray-500">
              Location de janvier 2022 à décembre 2024
            </p>

            <div className="mt-5 space-y-3">
              <ReferenceRow label="Paiement des loyers" />
              <ReferenceRow label="Entretien du logement" />
              <ReferenceRow label="Communication" />
            </div>

            <blockquote className="mt-6 border-l-2 border-indigo-200 pl-4 text-sm italic leading-relaxed text-gray-600">
              « Locataire sérieux et respectueux. La location s'est déroulée
              sans difficulté. »
            </blockquote>
          </div>
        </MotionDiv>
      </div>
    </Section>
  )
}
