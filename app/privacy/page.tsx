import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import Link from 'next/link'

export const metadata = {
  title: 'Politique de confidentialité | LocProof',
  description:
    'Découvrez comment LocProof collecte, utilise et protège vos données personnelles dans le cadre des recommandations locatives.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Politique de confidentialité | LocProof',
    description:
      'Transparence sur la collecte et l’utilisation des données personnelles dans le cadre du service LocProof.',
    url: 'https://locproof.fr/privacy',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Politique de confidentialité | LocProof',
    description:
      'Comment vos données sont utilisées et protégées sur LocProof.',
  },
  alternates: {
    canonical: 'https://locproof.fr/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <AppLayout>
      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
            🔐 Protection des données
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Politique de confidentialité
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            Vos données restent utilisées uniquement dans le cadre des
            recommandations locatives proposées par LocProof.
          </p>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Transparence, sécurité et respect de la vie privée font partie des
            fondations du projet.
          </p>
        </MotionDiv>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          {[
            {
              title: '1. Qui est responsable du traitement ?',
              content:
                'LocProof est un projet indépendant permettant aux locataires de solliciter des recommandations de leurs anciens bailleurs afin de valoriser leur sérieux dans le cadre de futures recherches de logement.',
            },
            {
              title: '2. Quelles données sont collectées ?',
              content:
                'LocProof peut collecter des informations comme le prénom, le nom, l’adresse email, l’adresse du logement loué, les dates de location ainsi que les réponses transmises par les bailleurs dans le cadre d’une recommandation.',
            },
            {
              title: '3. Pourquoi ces données sont-elles utilisées ?',
              content:
                'Ces données sont utilisées uniquement pour vérifier les demandes, permettre les échanges entre locataires et bailleurs, générer les profils LocProof et sécuriser la plateforme contre les abus.',
            },
            {
              title: '4. Ce qui n’est pas affiché publiquement',
              content:
                'Les adresses email, les jetons de validation, les informations techniques internes, le nom du bailleur ainsi que l’adresse complète d’un logement ne sont jamais rendus publics.',
            },
            {
              title: '5. Durée de conservation',
              content:
                'Les données sont conservées uniquement pendant la durée nécessaire au fonctionnement du service. Les liens sécurisés expirent automatiquement après une durée limitée.',
            },
            {
              title: '6. Vos droits',
              content:
                'Vous pouvez demander à consulter, modifier ou supprimer vos données personnelles à tout moment en nous contactant.',
            },
            {
              title: '7. Sécurité',
              content:
                'LocProof met en place des mesures raisonnables pour protéger les données personnelles et limiter les accès non autorisés.',
            },
            {
              title: '8. Recommandations et commentaires',
              content:
                'Les recommandations doivent rester factuelles, respectueuses et directement liées à l’expérience locative concernée. Les contenus manifestement abusifs peuvent être supprimés.',
            },
          ].map((section, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl border shadow-sm p-8"
            >
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </MotionDiv>
          ))}
        </div>

        {/* CONTACT */}
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 rounded-2xl bg-indigo-50 border border-indigo-100"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Une question concernant vos données ?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Vous pouvez nous contacter à tout moment pour toute question liée à
            vos données personnelles, à leur utilisation ou à leur suppression.
          </p>

          <Link
            href="mailto:contact@locproof.fr"
            className="mt-4 font-medium text-indigo-700 block"
          >
            contact@locproof.fr
          </Link>
        </MotionDiv>
      </section>
    </AppLayout>
  )
}
