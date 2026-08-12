import { Feature, Grid } from './grid'
import NavLink from '../navigation/nav-link'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Grid className="py-10">
        <Feature>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <Link
                href="/"
                className="font-semibold text-gray-900"
              >
                LocProof
              </Link>
              <p className="mt-1 text-sm text-gray-500">
                La référence locative qui valorise votre expérience.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              <NavLink href="/locproof">À propos</NavLink>
              <NavLink href="/example">Exemple</NavLink>
              <NavLink href="/privacy">Confidentialité</NavLink>
              <NavLink href="/legals">Mentions légales</NavLink>
              <NavLink href="mailto:contact@locproof.fr">Contact</NavLink>
            </nav>
          </div>
        </Feature>
      </Grid>
    </footer>
  )
}
