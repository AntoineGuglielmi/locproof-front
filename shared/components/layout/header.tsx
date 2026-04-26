import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight"
      >
        LocProof
      </Link>

      <nav className="flex gap-6 text-sm text-gray-600">
        <Link href="/create/me">Créer un dossier</Link>
      </nav>
    </header>
  )
}
