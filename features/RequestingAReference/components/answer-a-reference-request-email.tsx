/* eslint-disable react/no-unescaped-entities */
import {
  Html,
  Heading,
  Tailwind,
  pixelBasedPreset,
  Text,
  Link,
  Hr,
  Head,
  Body,
  Container,
  Preview,
} from 'react-email'

interface ValidateRentalProps {
  href: string
}

export default function AnswerAReferenceRequestEmail({
  href,
}: ValidateRentalProps) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: '#007291',
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-2xl border border-[#eaeaea] border-solid p-5">
            <Preview>
              Cliquez sur le lien fourni pour consulter la demande de votre
              ancien locataire
            </Preview>
            <Heading as="h2">Bonjour</Heading>

            <Text>
              Votre ancien locataire vous a demandé une recommandation via
              LocProof, la plateforme de recommandation de location.
            </Text>
            <Text>
              Pour consulter cette demande et rédiger votre recommandation,
              cliquez simplement sur le lien ci-dessous :
            </Text>
            <Text>
              <Link
                href={href}
                className="inline-flex gap-4 items-center rounded-full py-2 px-4 text-base text-white bg-indigo-600"
              >
                Rédiger ma recommandation
              </Link>
            </Text>
            <Text> Ce lien est valable pendant 7 jours.</Text>
            <Text>
              Si vous ne souhaitez pas rédiger de recommandation, vous pouvez
              ignorer cet email.
            </Text>
            <Hr />
            <Text className="font-bold">
              L'équipe <span className="text-indigo-600">LocProof</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
