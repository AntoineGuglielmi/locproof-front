import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'
import Link from 'next/link'
import Button from '@/shared/components/form/button'
import Tag from '@/shared/components/text/tag'

type HeroProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const HeroVariants = cva('Hero pt-16 pb-24 md:pt-24 md:pb-32', {
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

export default function Hero({ className, variant }: HeroProps) {
  return (
    <section className={cn(HeroVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Tag className="mb-6">Référence locative</Tag>

        <PageMainTitle>
          La référence locative qui valorise votre expérience.
        </PageMainTitle>

        <PageSubTitle className="mt-6 text-xl md:text-2xl text-gray-700">
          Votre dossier présente votre situation. LocProof permet également de
          faire valoir votre expérience en tant que locataire.
        </PageSubTitle>

        <TextBody className="mt-6 max-w-2xl mx-auto text-balance text-gray-600">
          Demandez à vos anciens bailleurs de témoigner de votre location grâce
          à une référence simple, structurée et authentifiée.
        </TextBody>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button>
            <Link href="/validate-email">Obtenir ma référence</Link>
          </Button>

          <Button
            asChild
            variant="outline"
          >
            <Link href="/locproof">Découvrir LocProof</Link>
          </Button>
        </div>
      </MotionDiv>
    </section>
  )
}
