'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/shared/components/shadcn/ui/input'
import { TypeAddressValue } from '@/shared/types/TypeAddressValue'

type AddressAutocompleteProps = {
  id?: string
  value?: TypeAddressValue
  onChange: (value?: TypeAddressValue) => void
  placeholder?: string
  'aria-invalid'?: boolean
}

type AddressApiFeature = {
  properties: {
    label: string
    city: string
  }
}

export function AddressAutocomplete({
  id,
  value,
  onChange,
  placeholder,
  'aria-invalid': ariaInvalid,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value?.label ?? '')
  const [results, setResults] = useState<AddressApiFeature[]>([])

  const timeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  const handleChange = (input: string) => {
    setQuery(input)

    // Tant qu'une adresse n'est pas sélectionnée,
    // la valeur métier est invalide.
    onChange(undefined)

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    const query = input.trim()

    if (query.length < 3) {
      setResults([])
      return
    }

    timeout.current = window.setTimeout(async () => {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
      )

      const data = await response.json()

      if (!response.ok) {
        setResults([])
        return
      }

      setResults(data.features ?? [])
    }, 300)
  }

  function selectAddress(properties: AddressApiFeature['properties']) {
    const address = {
      label: properties.label,
      city: properties.city,
    }

    setQuery(address.label)
    setResults([])

    onChange(address)
  }

  return (
    <div className="relative">
      <Input
        id={id}
        value={query}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        onChange={(event) => handleChange(event.target.value)}
      />

      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border bg-white shadow">
          {results.map(({ properties }, index) => (
            <button
              type="button"
              key={index}
              className="block w-full p-2 text-left hover:bg-gray-100"
              onClick={() => selectAddress(properties)}
            >
              {properties.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
