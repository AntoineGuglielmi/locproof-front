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

const ContactVariants = cva('Contact grid-full border-t', {
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
        title="Une question concernant LocProof ?"
        body={
          <>
            Pour toute question concernant le fonctionnement du service ou les
            informations présentes sur cette page, vous pouvez nous écrire à{' '}
            <Link
              href="mailto:contact@locproof.fr"
              className="font-medium underline underline-offset-2"
            >
              contact@locproof.fr
            </Link>
            .
          </>
        }
        type="info"
      />
    </Section>
  )
}
