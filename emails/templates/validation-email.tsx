import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components'

export const ValidationEmail = ({ url }: { url: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Validation de votre email LocProof</Preview>

      <Body style={{ backgroundColor: '#f6f7fb', fontFamily: 'Arial' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '40px' }}>
          
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
            LocProof
          </Text>

          <Text>
            Bonjour,
          </Text>

          <Text>
            Cliquez sur le bouton ci-dessous pour valider votre email.
          </Text>

          <Button
            href={url}
            style={{
              backgroundColor: '#4f46e5',
              color: '#fff',
              padding: '12px 18px',
              borderRadius: '8px',
            }}
          >
            Confirmer mon email
          </Button>

          <Text>
            Ce lien est valable 24h.
          </Text>

        </Container>
      </Body>
    </Html>
  )
}