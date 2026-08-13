import { cn } from '@/shared/lib/className'

type SectionProps = {
  className?: string
  which?: 'both' | 'topOnly' | 'bottomOnly'
  size?: 'none' | 'standard' | 'large'
  children?: React.ReactNode
}

const sectionSizes = {
  none: {
    both: '',
    topOnly: '',
    bottomOnly: '',
  },

  standard: {
    both: 'py-16 md:py-24',
    topOnly: 'pt-16 md:pt-24',
    bottomOnly: 'pb-16 md:pb-24',
  },

  large: {
    both: 'py-20 md:py-32',
    topOnly: 'pt-20 md:pt-32',
    bottomOnly: 'pb-20 md:pb-32',
  },
} as const

export default function Section({
  className,
  which = 'both',
  size = 'standard',
  children,
}: SectionProps) {
  return (
    <section className={cn('Section', sectionSizes[size][which], className)}>
      {children}
    </section>
  )
}
