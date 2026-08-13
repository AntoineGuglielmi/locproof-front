/* eslint-disable react/no-unescaped-entities */
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import List from '@/shared/components/list/List'
import ReferenceItem from './reference-item'
import { TypeSynthesis } from '@/shared/types/profile-synthesis'
import Link from 'next/link'
import Button from '@/shared/components/form/button'
import { ArrowRight } from 'lucide-react'

type ReferencesProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  referencesCount: TypeSynthesis['referencesCount']
  references: TypeSynthesis['references']
}

const ReferencesVariants = cva('References pb-14', {
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

export default function References({
  className,
  variant,
  referencesCount,
  references,
}: ReferencesProps) {
  return (
    <section className={cn(ReferencesVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-950">
            Références locatives
          </h2>

          <p className="text-sm text-gray-500">
            Les expériences renseignées par les précédents bailleurs.
          </p>
        </div>

        {referencesCount > 0 ? (
          <List
            items={references}
            getKey={(item) => item.id}
            renderItem={ReferenceItem}
            className="mt-6 flex flex-col gap-4"
          />
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed px-6 py-10 text-center">
            <p className="text-gray-600">
              Aucune référence n'est encore disponible.
            </p>

            <Button className="mt-4">
              <Link
                href="/validate-email"
                className="inline-flex items-center gap-1"
              >
                Demander une première référence
                <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </MotionDiv>
    </section>
  )
}
