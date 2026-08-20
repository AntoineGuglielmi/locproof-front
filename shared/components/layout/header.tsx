import Link from 'next/link'
import { Grid } from './grid'
import Button from '../form/button'
import NavLink from '../navigation/nav-link'
import LogoText from './LogoText'

export default function Header() {
  return (
    <header className="w-full py-4">
      <Grid>
        <div className="grid-feature flex items-center justify-between">
          <LogoText />

          <nav className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6">
              <NavLink href="/locproof">À propos</NavLink>
              <NavLink href="/example">Exemple</NavLink>
            </div>
            <Button
              asChild
              size="sm"
              variant="dark"
            >
              <Link href="/validate-email">Créer une référence</Link>
            </Button>
          </nav>
        </div>
      </Grid>
    </header>
  )
}
