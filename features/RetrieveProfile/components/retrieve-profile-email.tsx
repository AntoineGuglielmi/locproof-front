/* eslint-disable react/no-unescaped-entities */
import EmailButton from '@/features/Emails/components/EmailButton'
import {
  Html,
  Heading,
  Tailwind,
  pixelBasedPreset,
  Text,
  Hr,
  Head,
  Body,
  Container,
  Preview,
} from 'react-email'

interface RetrieveProfileProps {
  href: string
}

export default function RetrieveProfileEmail({ href }: RetrieveProfileProps) {
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
              Cliquez sur le lien fourni pour accéder à votre profile LocProof
            </Preview>
            <Heading as="h2">Bonjour</Heading>

            <Text>Voous avez demandé à retrouver votre profil LocProof.</Text>
            <Text>
              Pour y accéder, cliquez simplement sur le bouton ci-dessous :
            </Text>
            <Text>
              <EmailButton {...{ href }}>Voir mon profil</EmailButton>
            </Text>
            <Text>
              Si vous n’êtes pas à l’origine de cette demande, vous pouvez
              ignorer cet email.
            </Text>
            <Text>
              Pour toute question, n’hésitez pas à contacter notre équipe.{' '}
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
