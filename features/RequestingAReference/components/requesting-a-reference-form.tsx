'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tenant, TenantVerification } from '@/types/strapi-types'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'
import { DatePicker } from '@/shared/components/form/date-picker'
import MotionDiv from '@/shared/components/layout/motion-div'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { ActionRequestingAReference } from '../actions/ActionRequestingAReference'

export default function RequestingAReferenceForm(props: {
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
  const [cityPublic, setCityPublic] = useState('')

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

    if (!process.env.NEXT_PUBLIC_LOCPROOF_DEV && landlordEmail === email) {
      alert(
        'L’email du bailleur ne peut pas être le même que celui du locataire.',
      )
      return
    }

    try {
      setLoading(true)
      await ActionRequestingAReference({
        email,
        firstname,
        lastname,
        address,
        startDate: startDate!.toISOString(),
        endDate: endDate!.toISOString(),
        landlordEmail,
        tenantVerificationToken,
        cityPublic,
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
    <section className="max-w-xl mx-auto px-6">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <FieldSet className="w-full">
            <FieldLegend>Vos information</FieldLegend>
            <FieldDescription>
              Ces informations permettent au bailleur d’identifier la location.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Vore prénom"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Votre nom"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet className="w-full">
            <FieldLegend>Le logement concerné</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="address">Adresse</FieldLabel>
                <AddressAutocomplete
                  onChange={(address, city) => {
                    setAddress(address)
                    setCityPublic(city)
                  }}
                />
                <input
                  type="hidden"
                  name="cityPublic"
                  defaultValue={cityPublic}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstname">
                    Date de début de location
                  </FieldLabel>
                  <DatePicker
                    value={startDate}
                    onChange={(date) => updateDate('startDate', date)}
                    placeholder="Date de début"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastname">
                    Date de fin de location
                  </FieldLabel>
                  <DatePicker
                    value={endDate}
                    onChange={(date) => updateDate('endDate', date)}
                    placeholder="Date de fin"
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet className="w-full">
            <FieldLegend>Votre bailleur</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="landlordEmail">
                  Email du bailleur
                </FieldLabel>
                <Input
                  id="landlordEmail"
                  type="email"
                  placeholder="bailleur@email.com"
                  value={landlordEmail}
                  onChange={(e) => setLandlordEmail(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Button
            disabled={loading || formSubmitted}
            className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]"
          >
            {loading ? 'Envoi en cours...' : 'Demander une recommandation'}
          </Button>

          {formSubmitted && (
            <p className="text-green-600 text-center mt-4 text-balance">
              Demande envoyée ! Votre bailleur devrait recevoir un email sous
              peu.
            </p>
          )}
        </form>
      </MotionDiv>
    </section>
  )
}
