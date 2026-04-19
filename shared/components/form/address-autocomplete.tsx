'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function AddressAutocomplete({
  placeholder = 'Adresse du logement',
}: {
  placeholder?: string
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleChange = async (value: string) => {
    setQuery(value)

    if (value.length <= 3) {
      setResults([])
      return
    }

    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`,
    )
    const data = await res.json()
    console.log({
      data,
    })

    setResults(data.features)
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-xl shadow mt-1">
          {results.map((item, i) => (
            <div
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(item.properties.label)
                setResults([])
              }}
            >
              {item.properties.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
