/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import CopyProfileLink from '@/features/Profile/components/items/copy-profile-link'
import Section from '@/shared/components/layout/section'

type ShareProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ShareVariants = cva('Share Breakout', {
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

export default function Share({ className, variant }: ShareProps) {
  return (
    <Section
      size="x-small"
      which="bottomOnly"
      className={cn(ShareVariants({ variant, className }))}
    >
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-gray-50 border px-6 py-8 text-center"
      >
        <p className="font-medium text-gray-900">Vous consultez ce profil ?</p>

        <p className="mt-1 text-sm text-gray-500">
          Ce profil peut être partagé directement avec un bailleur ou un
          professionnel de l'immobilier.
        </p>

        <div className="mt-5 flex justify-center">
          <CopyProfileLink>Copier le lien du profil</CopyProfileLink>
        </div>
      </MotionDiv>
    </Section>
  )
}
