import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import { ShieldCheck } from 'lucide-react'
import { Tenant } from '@/shared/types/strapi-types'
import Tag from '@/shared/components/text/tag'

type HeaderProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  tenant: Tenant
}

const HeaderVariants = cva('Header pt-12 pb-10 md:pt-16 md:pb-12', {
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

export default function Header({ className, variant, tenant }: HeaderProps) {
  return (
    <section className={cn(HeaderVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <span className="text-2xl font-semibold">
                {tenant.firstname?.charAt(0)}
                {tenant.lastname?.charAt(0)}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950">
                  {tenant.firstname} {tenant.lastname}
                </h1>

                {tenant.verified && (
                  <Tag
                    size="small"
                    type="success"
                    Icon={ShieldCheck}
                  >
                    Vérifié
                  </Tag>
                )}
              </div>

              <p className="mt-2 text-gray-500">Profil locataire LocProof</p>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-5 py-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-indigo-600" />

              <div>
                <p className="font-medium text-gray-900">
                  Une référence locative fondée sur l’expérience
                </p>

                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  Les informations présentées sur ce profil proviennent de
                  références renseignées directement par des bailleurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </section>
  )
}
