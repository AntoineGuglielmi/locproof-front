import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from './motion-div'
import TextBody from '../text/text-body'
import Button from '../form/button'
import Link from 'next/link'

type CTASectionProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  label?: string
  title: string
  body: string
  buttonLabel: string
  buttonHref: string
  subBody?: string
}

const CTASectionVariants = cva(
  'CTASection rounded-3xl bg-gray-900 px-6 py-16 md:px-12 md:py-20 text-center flex flex-col gap-5 items-center',
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

export default function CTASection({
  className,
  variant,
  body,
  buttonHref,
  buttonLabel,
  subBody,
  title,
  label,
}: CTASectionProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(CTASectionVariants({ variant, className }))}
    >
      {label && (
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
          {label}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
        {title}{' '}
      </h2>

      <TextBody className="text-gray-300 text-balance">{body}</TextBody>

      <div className="CTASection__footer flex flex-col gap-1">
        <Button
          asChild
          variant="outlineDarker"
          className="mt-3"
        >
          <Link href={buttonHref}>{buttonLabel}</Link>
        </Button>
        {subBody && <p className="mt-4 text-sm text-gray-400">{subBody}</p>}
      </div>
    </MotionDiv>
  )
}
