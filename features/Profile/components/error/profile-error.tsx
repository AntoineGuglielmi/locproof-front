/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'

type ProfileErrorProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ProfileErrorVariants = cva('ProfileError text-center pt-16 pb-10 ', {
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

export default function ProfileError({
  className,
  variant,
}: ProfileErrorProps) {
  return (
    <section className={cn(ProfileErrorVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <PageMainTitle className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Utilisateur inconnu
          </PageMainTitle>

          <PageSubTitle className="text-gray-600 mb-8">
            Le profile que vous cherchez à visiter n'existe pas. Veuillez vous
            rapprocher du locataire.
          </PageSubTitle>
        </div>
      </MotionDiv>
    </section>
  )
}
