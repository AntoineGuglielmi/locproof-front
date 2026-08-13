'use client'

import Button from '@/shared/components/form/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type CopyProfileLinkProps = {
  className?: string
  children?: React.ReactNode
}

export default function CopyProfileLink({
  children,
  className,
}: CopyProfileLinkProps) {
  const [copied, setCopied] = useState(false)

  return (
    <div className={className}>
      <CopyToClipboard
        text={typeof window !== 'undefined' ? window.location.href : ''}
        onCopy={() => setCopied(true)}
      >
        <Button variant="outline">
          {copied ? <Check /> : <Copy />}
          {copied ? 'Lien copié' : children}
        </Button>
      </CopyToClipboard>
    </div>
  )
}
