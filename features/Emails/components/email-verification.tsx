type EmailVerificationProps = {
  className?: string
  children?: React.ReactNode
  firstname: string
}

export default function EmailVerification({
  firstname
}: EmailVerificationProps) {

  return (
    <div>
        <h1>Hello {firstname}!</h1>
    </div>
  )
}
