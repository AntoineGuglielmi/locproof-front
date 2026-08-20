import { Link } from 'react-email'

type EmailButtonProps = {
  href: string
  children: React.ReactNode
}

export default function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex gap-4 items-center rounded-xl whitespace-normal h-auto bg-indigo-600 px-4 py-3 text-base text-white"
    >
      {children}
    </Link>
  )
}
