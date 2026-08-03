'use client'

import { Button } from '@/shared/components/shadcn/ui/button'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type CopyProfileLinkProps = {
  className?: string
  children?: React.ReactNode
}

export default function CopyProfileLink({ children }: CopyProfileLinkProps) {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <CopyToClipboard
        text={typeof window !== 'undefined' ? window.location.href : ''}
        onCopy={() => setCopied(true)}
      >
        <Button className="px-8 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700">
          {children}
        </Button>
      </CopyToClipboard>
      {copied ? (
        <p className="text-green-600 text-center mt-4">
          Le lien du profile a été copié dans le presse-papier.
        </p>
      ) : null}
    </>
  )
}
