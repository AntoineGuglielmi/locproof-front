type ValidateEmailSuccessProps = {
  email: string
}

export default function ValidateEmailSuccess({
  email,
}: ValidateEmailSuccessProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border text-center space-y-4">
      <div className="text-4xl">✉️</div>

      <h2 className="text-lg font-semibold">Vérifiez votre boîte mail</h2>

      <p className="text-gray-600">Nous avons envoyé un lien sécurisé à :</p>

      <p className="font-medium">{email}</p>

      <p className="text-sm text-gray-500">
        Cliquez sur ce lien pour continuer la création de votre dossier
        locataire.
      </p>
    </div>
  )
}
