'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tenant, TenantVerification } from '@/types/strapi-types'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'
import { DatePicker } from '@/shared/components/form/date-picker'
import { ActionSubmitCreateRentalForm } from './actions'

export default function CreateRentalForm(props: {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
}) {
  const [email] = useState(props.email!)
  const [firstname, setFirstname] = useState(props.firstname || '')
  const [lastname, setLastname] = useState(props.lastname || '')
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [landlordEmail, setLandlordEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { tenantVerificationToken } = props

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (
      !email ||
      !firstname ||
      !lastname ||
      !address ||
      !startDate ||
      !endDate ||
      !landlordEmail
    ) {
      alert('Veuillez remplir tous les champs')
      return
    }

    // TODO: uncomment when the tenant verification flow is ready
    // if (landlordEmail === email) {
    //   alert(
    //     'L’email du bailleur ne peut pas être le même que celui du locataire.',
    //   )
    //   return
    // }

    try {
      setLoading(true)
      await ActionSubmitCreateRentalForm({
        email,
        firstname,
        lastname,
        address,
        startDate: startDate!.toISOString(),
        endDate: endDate!.toISOString(),
        landlordEmail,
        tenantVerificationToken,
      })
      setFormSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  function updateDate(key: 'startDate' | 'endDate', date: Date | undefined) {
    if (key === 'startDate') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }

    if (date) {
      if (key === 'startDate') {
        const endDateIsBeforeStartDate = endDate === undefined || date > endDate
        if (endDateIsBeforeStartDate) {
          setEndDate(date)
        }
      }

      if (key === 'endDate' && endDate) {
        const startDateIsAfterEndDate =
          startDate === undefined || startDate > date
        if (startDateIsAfterEndDate) {
          setStartDate(date)
        }
      }
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
            Vos informations
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="mt-2"
            />
            <Input
              placeholder="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <label className="text-sm font-medium text-gray-700">
          Le logement concerné
        </label>
        <div className="mt-2">
          <AddressAutocomplete onChange={(value) => setAddress(value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            value={startDate}
            onChange={(date) => updateDate('startDate', date)}
            placeholder="Date de début"
          />

          <DatePicker
            value={endDate}
            onChange={(date) => updateDate('endDate', date)}
            placeholder="Date de fin"
          />
        </div>

        <Input
          placeholder="Email du bailleur"
          type="email"
          value={landlordEmail}
          onChange={(e) => setLandlordEmail(e.target.value)}
        />

        <p className="text-sm text-gray-500">
          Votre bailleur recevra un email simple pour confirmer votre location.
          Aucune création de compte requise.
        </p>

        <Button
          onClick={handleSubmit}
          className="w-full mt-4 rounded-full py-4 text-base bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? 'Envoi en cours...' : 'Demander une recommandation'}
        </Button>

        {formSubmitted && (
          <p className="text-green-600 text-center mt-4">
            Demande envoyée ! Votre bailleur devrait recevoir un email sous peu.
          </p>
        )}
      </form>
    </div>
  )
}
