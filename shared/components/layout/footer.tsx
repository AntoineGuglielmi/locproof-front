import Link from 'next/link'
import { Feature, Grid } from './grid'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Grid className="py-10">
        <Feature>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-semibold text-gray-900">LocProof</p>
              <p className="mt-1 text-sm text-gray-500">
                La référence locative qui valorise votre expérience.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-500">
              <Link
                href="/locproof"
                className="transition-colors hover:text-gray-900"
              >
                À propos
              </Link>
              <Link
                href="/example"
                className="transition-colors hover:text-gray-900"
              >
                Exemple
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-gray-900"
              >
                Confidentialité
              </Link>
              <Link
                href="/legals"
                className="transition-colors hover:text-gray-900"
              >
                Mentions légales
              </Link>
              <Link
                href="mailto:contact@locproof.fr"
                className="transition-colors hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </Feature>
      </Grid>
    </footer>
  )
}
