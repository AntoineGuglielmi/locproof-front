import AppLayout from '@/shared/components/layout/app-layout'
import References from '@/features/Privacy/components/sections/references'
import Visibility from '@/features/Privacy/components/sections/visibility'
import Hero from '@/features/Privacy/components/sections/hero'
import WhoSResponsible from '@/features/Privacy/components/sections/who-s-responsible'
import CollectedData from '@/features/Privacy/components/sections/collected-data'
import Purpose from '@/features/Privacy/components/sections/purpose'
import Providers from '@/features/Privacy/components/sections/providers'
import Cookies from '@/features/Privacy/components/sections/cookies'
import Conservation from '@/features/Privacy/components/sections/conservation'
import YourRights from '@/features/Privacy/components/sections/your-rights'
import SecuredLinks from '@/features/Privacy/components/sections/secured-links'
import Security from '@/features/Privacy/components/sections/security'
import Evolution from '@/features/Privacy/components/sections/evolution'
import Contact from '@/features/Privacy/components/sections/contact'

export const metadata = {
  title: 'Politique de confidentialité | LocProof',
  description:
    'Découvrez quelles données sont utilisées par LocProof, pourquoi elles le sont et quels sont vos droits.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <AppLayout>
      {/* Hero */}
      <Hero />

      {/* Responsable du traitement */}
      <WhoSResponsible />

      {/* Données collectées */}
      <CollectedData />

      {/* Finalités */}
      <Purpose />

      {/* Références */}
      <References />

      {/* Visibilité */}
      <Visibility />

      {/* Liens temporaires */}
      <SecuredLinks />

      {/* Prestataires */}
      <Providers />

      {/* Cookies */}
      <Cookies />

      {/* Conservation */}
      <Conservation />

      {/* Droits */}
      <YourRights />

      {/* Sécurité */}
      <Security />

      {/* Évolution */}
      <Evolution />

      {/* Contact */}
      <Contact />
    </AppLayout>
  )
}
