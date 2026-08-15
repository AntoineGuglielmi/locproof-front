import { cn } from '@/shared/lib/className'

type SectionProps = {
  className?: string
  which?: 'both' | 'topOnly' | 'bottomOnly'
  size?: 'none' | 'standard' | 'large' | 'small' | 'x-small'
  children?: React.ReactNode
}

const sectionSizes = {
  none: {
    both: '',
    topOnly: '',
    bottomOnly: '',
  },

  'x-small': {
    both: 'py-8 md:py-16',
    topOnly: 'pt-8 md:pt-16',
    bottomOnly: 'pb-8 md:pb-16',
  },

  small: {
    both: 'py-12 md:py-20',
    topOnly: 'pt-12 md:pt-20',
    bottomOnly: 'pb-12 md:pb-20',
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
