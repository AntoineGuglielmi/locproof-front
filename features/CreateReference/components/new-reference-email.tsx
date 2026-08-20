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

interface NewReferenceProps {
  href: string
}

export default function NewReferenceEmail({ href }: NewReferenceProps) {
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
              Cliquez sur le lien fourni pour consulter la recommandation
              rédigée par votre ancien bailleur
            </Preview>
            <Heading as="h2">Bonjour</Heading>

            <Text>
              Votre ancien bailleur a rédigé une recommandation pour vous sur
              LocProof, la plateforme de recommandation de location.
            </Text>
            <Text>
              Cette recommandation est désormais disponible sur votre profil.
              Pour la consulter, cliquez simplement sur le lien ci-dessous :
            </Text>
            <Text>
              <EmailButton href={href}>Voir mon profil</EmailButton>
            </Text>
            <Text>
              Si vous pensez qu'il y a une erreur ou si vous avez des questions,
              n'hésitez pas à contacter notre support.
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
