import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Link, { LinkProps } from 'next/link'

type NavLinkProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
} & LinkProps

const NavLinkVariants = cva(
  'NavLink transition-colors text-sm text-gray-500 hover:text-gray-900',
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

export default function NavLink({
  className,
  variant,
  children,
  ...linkProps
}: NavLinkProps) {
  return (
    <Link
      {...linkProps}
      className={cn(NavLinkVariants({ variant, className }))}
    >
      {children}
    </Link>
  )
}
