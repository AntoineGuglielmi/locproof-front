'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'

export function AddressAutocomplete({
  placeholder = 'Adresse du logement',
  onChange,
}: {
  placeholder?: string
  onChange?: (value: string) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const debounceTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)

    if (debounceTimeout.current) {
      window.clearTimeout(debounceTimeout.current)
    }

    if (value.length <= 3) {
      setResults([])
      return
    }

    debounceTimeout.current = window.setTimeout(async () => {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`,
      )
      const data = await res.json()

      setResults(data.features)
    }, 300)
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {results && results.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-xl shadow mt-1">
          {results.map((item, i) => (
            <div
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(item.properties.label)
                onChange?.(item.properties.label)
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
