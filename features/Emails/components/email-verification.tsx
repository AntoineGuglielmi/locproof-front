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

interface EmailValidationProps {
  href: string
}

export default function EmailValidation({ href }: EmailValidationProps) {
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
              Cliquez sur le lien fourni pour valider que la demande vient bien
              de vous
            </Preview>
            <Heading as="h2">Bonjour</Heading>

            <Text>
              Vous êtes sur le point de demander une recommandation à un ancien
              bailleur.
            </Text>
            <Text>
              Pour vérifier que cette demande vient bien de vous, cliquez
              simplement sur le lien ci-dessous :
            </Text>
            <Text>
              <Link
                href={href}
                className="inline-flex gap-4 items-center rounded-full py-2 px-4 text-base text-white bg-indigo-600"
              >
                Confirmer ma demande
              </Link>
            </Text>
            <Text>Ce lien est valable pendant 24 heures.</Text>
            <Text>
              Si vous n’êtes pas à l’origine de cette demande, vous pouvez
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