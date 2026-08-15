import Image from 'next/image'
import Link from 'next/link'
import { Grid } from './grid'
import Button from '../form/button'
import NavLink from '../navigation/nav-link'

export default function Header() {
  return (
    <header className="w-full py-4">
      <Grid>
        <div className="Feature flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold tracking-tight"
          >
            <Image
              alt="LocProof"
              src="/locproof.png"
              width={50}
              height={50}
              className="size-8"
              unoptimized
            />
            <span>LocProof</span>
          </Link>

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
