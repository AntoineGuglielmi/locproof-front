import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import Link from 'next/link'

export const metadata = {
  title: 'Mentions légales | LocProof',
  description:
    'Informations légales concernant l’éditeur, l’hébergement et le fonctionnement de LocProof.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mentions légales | LocProof',
    description: 'Informations légales et cadre juridique du service LocProof.',
    url: 'https://locproof.fr/legals',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Mentions légales | LocProof',
    description: 'Mentions légales et informations sur l’éditeur de LocProof.',
  },
  alternates: {
    canonical: 'https://locproof.fr/legals',
  },
}

export default function LegalPage() {
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
            ⚖️ Informations légales
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Mentions légales
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            Les informations relatives à l’éditeur, à l’hébergement et au
            fonctionnement de LocProof.
          </p>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Cette page est fournie conformément à la législation française en
            vigueur.
          </p>
        </MotionDiv>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          {[
            {
              title: '1. Éditeur du site',
              content:
                'LocProof est un projet indépendant édité par Antoine Guglielmi.',
            },
            {
              title: '2. Contact',
              content:
                'Pour toute question concernant le site ou le service, vous pouvez nous contacter à l’adresse suivante : contact@locproof.fr',
            },
            {
              title: '3. Hébergement',
              content:
                'Le site LocProof est hébergé par un prestataire d’hébergement situé au sein de l’Union européenne.',
            },
            {
              title: '4. Objet du service',
              content:
                'LocProof propose une plateforme permettant aux locataires de solliciter des recommandations de leurs anciens bailleurs afin de valoriser leur sérieux dans le cadre de recherches de logement.',
            },
            {
              title: '5. Responsabilité',
              content:
                'LocProof s’efforce de fournir un service accessible et des informations exactes, mais ne peut garantir l’absence totale d’erreurs, d’interruptions ou d’informations inexactes publiées par les utilisateurs.',
            },
            {
              title: '6. Contenus publiés',
              content:
                'Les utilisateurs restent responsables des informations et recommandations qu’ils transmettent via la plateforme. LocProof se réserve le droit de supprimer tout contenu manifestement abusif, diffamatoire ou inapproprié.',
            },
            {
              title: '7. Données personnelles',
              content:
                'Les données personnelles collectées dans le cadre du service sont traitées conformément à la politique de confidentialité disponible sur le site.',
            },
            {
              title: '8. Propriété intellectuelle',
              content:
                'Les contenus, éléments graphiques, logos, textes et composants du site LocProof sont protégés par les règles applicables à la propriété intellectuelle.',
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
            Besoin d’informations complémentaires ?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Vous pouvez nous contacter pour toute question relative au service,
            au fonctionnement de la plateforme ou à vos données personnelles.
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
