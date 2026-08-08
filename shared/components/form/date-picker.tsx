'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'

import { Calendar } from '@/shared/components/shadcn/ui/calendar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/shadcn/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/shadcn/ui/popover'

function formatDate(date?: Date) {
  if (!date) return ''

  return date.toLocaleDateString('fr-FR')
}

function parseDate(value: string): Date | undefined {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  if (!match) return undefined

  const [, day, month, year] = match

  const date = new Date(Number(year), Number(month) - 1, Number(day))

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return undefined
  }

  return date
}

function formatInputValue(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

type DatePickerProps = {
  id?: string
  value?: Date
  onChange: (date?: Date) => void
  placeholder?: string
  'aria-invalid'?: boolean
}

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'JJ/MM/AAAA',
  'aria-invalid': ariaInvalid,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(formatDate(value))

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatInputValue(event.target.value)

    setInputValue(formattedValue)

    const date = parseDate(formattedValue)

    if (date) {
      onChange(date)
    } else if (formattedValue.length === 0) {
      onChange(undefined)
    }
  }

  function handleSelect(date?: Date) {
    setInputValue(formatDate(date))
    onChange(date)
    setOpen(false)
  }

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        value={inputValue}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        onChange={handleInputChange}
      />

      <InputGroupAddon align="inline-end">
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <InputGroupButton
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Sélectionner une date"
            >
              <CalendarIcon />
              <span className="sr-only">Sélectionner une date</span>
            </InputGroupButton>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
