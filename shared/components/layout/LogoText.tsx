import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Image from 'next/image'
import Link from 'next/link'

type LogoTextProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const LogoTextVariants = cva(
  'LogoText flex items-center gap-3 text-xl font-bold tracking-tight',
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

export default function LogoText({ className, variant }: LogoTextProps) {
  return (
    <Link
      href="/"
      className={cn(LogoTextVariants({ variant, className }))}
    >
      <Image
        alt="LocProof"
        src="/locproof.png"
        width={50}
        height={50}
        className="size-8"
        unoptimized
      />
      <span>LocProof</span>
    </Link>
  )
}
