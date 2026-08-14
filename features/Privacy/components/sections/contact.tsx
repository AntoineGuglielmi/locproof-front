import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import Panel from '@/shared/components/text/panel'
import Link from 'next/link'

type ContactProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ContactVariants = cva('Contact', {
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

export default function Contact({ className, variant }: ContactProps) {
  return (
    <Section
      which="topOnly"
      className={cn(ContactVariants({ variant, className }))}
    >
      <Panel
        type="info"
        title="Une question concernant vos données ?"
        body={
          <>
            Si vous souhaitez obtenir des informations sur vos données
            personnelles, demander leur modification ou leur suppression, vous
            pouvez nous contacter directement à{' '}
            <Link
              href="mailto:contact@locproof.fr"
              className="font-medium underline underline-offset-2"
            >
              contact@locproof.fr
            </Link>
            .
          </>
        }
      />
    </Section>
  )
}
