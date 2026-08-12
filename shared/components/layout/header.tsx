import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/components/shadcn/ui/button'
import { Feature, Grid } from './grid'

export default function Header() {
  return (
    <header className="w-full py-4">
      <Grid>
        <Feature>
          <div className="flex items-center justify-between">
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
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
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
              </div>
              <Button
                asChild
                size="sm"
                className="rounded-lg"
              >
                <Link href="/validate-email">Créer une référence</Link>
              </Button>
            </nav>
          </div>
        </Feature>
      </Grid>
    </header>
  )
}
