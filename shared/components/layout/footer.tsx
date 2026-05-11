import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* BRAND */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-900">LocProof</p>

          <p className="text-sm text-gray-500 mt-1">
            Recommandations locatives vérifiées
          </p>
        </div>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm text-gray-500">
          <Link
            href="/example"
            className="hover:text-gray-900 transition-colors"
          >
            Exemple de profil
          </Link>

          <Link
            href="/privacy"
            className="hover:text-gray-900 transition-colors"
          >
            Confidentialité
          </Link>

          <Link
            href="/legals"
            className="hover:text-gray-900 transition-colors"
          >
            Mentions légales
          </Link>

          <Link
            href="mailto:contact@locproof.fr"
            className="hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
