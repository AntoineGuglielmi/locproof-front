import AppLayout from '@/shared/components/layout/app-layout'
import { tenantRepository } from '@/repositories/tenant.repository'
import { EntityTenantSynthesis } from '@/shared/entities/EntityTenantSynthesis'
import Profile from '@/features/Profile/components/profile'
import ProfileError from '@/features/Profile/components/error/profile-error'

type ProfilePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const metadata = {
  title: 'Profil locataire vérifié | LocProof',
  description:
    'Consultez un profil locataire LocProof et découvrez les références vérifiées de ses précédents bailleurs.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Profil locataire vérifié | LocProof',
    description:
      'Découvrez les références locatives vérifiées d’un locataire sur LocProof.',
    type: 'website',
    siteName: 'LocProof',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profil locataire vérifié | LocProof',
    description:
      'Découvrez les références locatives vérifiées d’un locataire sur LocProof.',
  },
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params

  const tenant = await tenantRepository.findBySlug(slug)

  if (!tenant) {
    return (
      <AppLayout>
        <ProfileError />
      </AppLayout>
    )
  }

  const tenantSynthesis = new EntityTenantSynthesis(tenant)
  const synthesis = await tenantSynthesis.getSynthesis()

  return (
    <AppLayout>
      <Profile
        tenant={tenant}
        synthesis={synthesis}
      />
    </AppLayout>
  )
}
