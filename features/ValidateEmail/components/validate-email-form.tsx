'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ActionValidateEmail } from '../actions/ActionValidateEmail'

export default function ValidateEmailForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email) {
      alert('Veuillez entrer votre email')
      return
    }

    try {
      setLoading(true)
      await ActionValidateEmail({ email })
      // 👉 plus tard : afficher un état "email envoyé"
      setFormSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Votre email
          </label>
          <Input
            type="email"
            placeholder="votre@email.com"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">
            Nous l’utilisons uniquement pour vérifier que la demande vient bien
            de vous. Aucun compte à créer.
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading || formSubmitted}
          className="w-full mt-4 rounded-full py-4 text-base bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? 'Envoi en cours...' : 'Recevoir mon lien sécurisé'}
        </Button>

        {formSubmitted && (
          <p className="text-green-600 text-center mt-4">
            Lien envoyé ! Vérifiez votre boîte de réception.
          </p>
        )}
      </form>
    </div>
  )
}
