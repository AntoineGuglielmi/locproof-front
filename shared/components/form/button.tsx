import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { Button as ShadcnButton } from '../shadcn/ui/button'

const customButtonVariants = cva('Button rounded-xl whitespace-normal h-auto', {
  variants: {
    variant: {
      default: 'bg-indigo-600 hover:bg-indigo-700',
      outline: '',
      outlineDarker: 'hover:bg-gray-300',
      dark: 'bg-primary',
      link: '',
    },

    size: {
      default: 'px-4 py-3 text-base',
      sm: 'rounded-lg px-2.5 py-0.5',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const shadcnVariants = {
  default: 'default',
  outline: 'outline',
  outlineDarker: 'outline',
  dark: 'default',
  link: 'link',
} as const

const shadcnSizes = {
  default: 'default',
  sm: 'sm',
} as const

type ButtonProps = Omit<
  React.ComponentProps<typeof ShadcnButton>,
  'variant' | 'size'
> &
  VariantProps<typeof customButtonVariants>

export default function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  const customVariant = variant ?? 'default'
  const customSize = size ?? 'default'

  const shadcnVariant = shadcnVariants[customVariant]
  const shadcnSize = shadcnSizes[customSize]

  return (
    <ShadcnButton
      {...props}
      variant={shadcnVariant}
      size={shadcnSize}
      className={cn(
        customButtonVariants({
          variant: customVariant,
          size: customSize,
        }),
        className,
      )}
    >
      {children}
    </ShadcnButton>
  )
}
