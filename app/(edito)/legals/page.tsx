import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import Section from '@/shared/components/layout/section'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import Panel from '@/shared/components/text/panel'
import Link from 'next/link'

export const metadata = {
  title: 'Mentions légales | LocProof',
  description:
    'Informations légales concernant LocProof, son éditeur, son hébergement et son fonctionnement.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mentions légales | LocProof',
    description:
      'Informations légales concernant LocProof, son éditeur et son fonctionnement.',
    url: 'https://locproof.fr/legals',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://locproof.fr/legals',
  },
}

export default function LegalPage() {
  return (
    <AppLayout>
      <Section
        size="large"
        which="bottomOnly"
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Informations légales</SectionLabel>

          <PageMainTitle className="mt-4">Mentions légales</PageMainTitle>

          <PageSubTitle className="mt-6 max-w-3xl text-xl md:text-2xl">
            Les informations relatives à l’éditeur, à l’hébergement et au
            fonctionnement de LocProof.
          </PageSubTitle>
        </MotionDiv>
      </Section>

      <Section
        which="bottomOnly"
        size="standard"
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Éditeur</SectionLabel>

          <SectionTitle>Qui édite LocProof ?</SectionTitle>

          <div className="space-y-5">
            <TextBody>
              LocProof est un projet indépendant édité par Antoine Guglielmi.
            </TextBody>

            <TextBody>
              Pour toute question concernant le site ou le service, vous pouvez
              nous contacter à l’adresse suivante :
            </TextBody>

            <Link
              href="mailto:contact@locproof.fr"
              className="inline-block font-medium text-indigo-600 hover:text-indigo-700"
            >
              contact@locproof.fr
            </Link>
          </div>
        </MotionDiv>
      </Section>

      <Section className="FullWidth border-y bg-white">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Hébergement</SectionLabel>

          <SectionTitle>Où est hébergé le service ?</SectionTitle>

          <TextBody>
            Le site et les services de LocProof sont hébergés par{' '}
            <strong className="font-medium text-gray-900">02Switch</strong>,
            dont le siège social est situé{' '}
            <strong className="font-medium text-gray-900">
              Chem. des Pardiaux, 63000 Clermont-Ferrand
            </strong>
            .
          </TextBody>
        </MotionDiv>
      </Section>

      <Section>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Le service</SectionLabel>

          <SectionTitle>À quoi sert LocProof ?</SectionTitle>

          <div className="space-y-5">
            <TextBody>
              LocProof permet aux locataires de solliciter une référence auprès
              d’un ancien bailleur afin de valoriser leur expérience locative
              dans le cadre de futures recherches de logement.
            </TextBody>

            <TextBody>
              Le service permet notamment au bailleur de répondre à un
              questionnaire portant sur différents aspects de la location, puis
              au locataire de partager la référence obtenue.
            </TextBody>
          </div>
        </MotionDiv>
      </Section>

      <Section className="FullWidth border-y bg-white">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Responsabilité</SectionLabel>

          <SectionTitle>Utilisation du service</SectionTitle>

          <div className="space-y-5">
            <TextBody>
              Les utilisateurs restent responsables des informations et contenus
              qu’ils transmettent via LocProof.
            </TextBody>

            <TextBody>
              LocProof s’efforce d’assurer le bon fonctionnement du service et
              de maintenir des informations fiables. Toutefois, aucune
              plateforme ne peut garantir l’absence totale d’erreurs,
              d’interruption de service ou d’informations inexactes communiquées
              par ses utilisateurs.
            </TextBody>

            <TextBody>
              Les recommandations doivent rester factuelles, respectueuses et
              directement liées à l’expérience locative concernée.
            </TextBody>
          </div>
        </MotionDiv>
      </Section>

      <Section>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Propriété intellectuelle</SectionLabel>

          <SectionTitle>Les contenus de LocProof</SectionTitle>

          <TextBody>
            Les textes, éléments graphiques, logos, interfaces, composants et
            autres éléments constitutifs du site LocProof sont protégés par les
            règles applicables en matière de propriété intellectuelle. Toute
            reproduction ou utilisation non autorisée de ces éléments est
            susceptible de constituer une atteinte aux droits de leur titulaire.
          </TextBody>
        </MotionDiv>
      </Section>

      <Section which="topOnly">
        <Panel
          title="Une question concernant LocProof ?"
          body={
            <>
              Pour toute question concernant le fonctionnement du service ou les
              informations présentes sur cette page, vous pouvez nous écrire à{' '}
              <Link
                href="mailto:contact@locproof.fr"
                className="font-medium underline underline-offset-2"
              >
                contact@locproof.fr
              </Link>
              .
            </>
          }
          type="info"
        />
      </Section>
    </AppLayout>
  )
}
