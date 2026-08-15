import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Tenant } from '@/shared/types/strapi-types'
import { TypeSynthesis } from '@/shared/types/profile-synthesis'
import Header from './sections/header'
import Summary from './sections/summary'
import References from './sections/references'
import Share from './sections/share'
import Explanation from './sections/explanation'

type ProfileProps = {
  className?: string
  tenant: Tenant
  synthesis: TypeSynthesis
  share?: boolean
  explanation?: boolean
}

const ProfileVariants = cva('Profile FullWidth', {
  variants: {},
  defaultVariants: {},
})

export default function Profile({
  className,
  tenant,
  synthesis,
  share = true,
  explanation = true,
}: ProfileProps) {
  const { referencesCount, references, scores } = synthesis

  return (
    <div className={cn(ProfileVariants({ className }))}>
      <Header tenant={tenant} />

      <Summary
        referencesCount={referencesCount}
        scores={scores}
      />

      <References
        referencesCount={referencesCount}
        references={references}
      />

      {share && <Share />}

      {explanation && <Explanation />}
    </div>
  )
}
