import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import {
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { TypeSynthesis } from '@/shared/types/profile-synthesis'
import { TypeScores } from '@/features/Profile/types/TypeScores'
import List from '@/shared/components/list/List'
import SummaryScoreItem from '@/features/Profile/components/items/summary-score-item'
import Section from '@/shared/components/layout/section'

type SummaryProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  referencesCount: TypeSynthesis['referencesCount']
  scores: TypeSynthesis['scores']
}

const SummaryVariants = cva('Summary', {
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

export default function Summary({
  className,
  variant,
  referencesCount,
  scores,
}: SummaryProps) {
  const scoresArray: TypeScores = [
    {
      label: 'Paiement des loyers',
      value: scores.paidOnTime,
      icon: ClipboardCheck,
    },
    {
      label: 'Entretien du logement',
      value: scores.wellMaintained,
      icon: Wrench,
    },
    {
      label: 'Qualité des échanges',
      value: scores.communication,
      icon: MessageCircle,
    },
    {
      label: 'Recommandation',
      value: scores.recommended,
      icon: CheckCircle2,
    },
  ]

  return (
    <Section
      size="x-small"
      which="bottomOnly"
      className={cn(SummaryVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-indigo-600" />

            <h2 className="text-xl font-semibold text-gray-950">
              Expérience locative
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            Une synthèse basée sur {referencesCount}{' '}
            {referencesCount > 1
              ? 'références vérifiées'
              : 'référence vérifiée'}
            .
          </p>
        </div>

        {referencesCount > 0 ? (
          <List
            items={scoresArray}
            renderItem={SummaryScoreItem}
            getKey={(item) => item.label}
            itemExtraProps={{ referencesCount }}
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
          />
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed px-6 py-10 text-center flex flex-col gap-2 items-center">
            <p className="font-medium text-gray-900">
              Ce profil est en cours de constitution.
            </p>

            <p className="text-sm leading-relaxed text-gray-500 max-w-prose mx-auto text-balance">
              Les premières références vérifiées permettront de mieux documenter
              l’expérience locative de ce profil.
            </p>
          </div>
        )}
      </MotionDiv>
    </Section>
  )
}
