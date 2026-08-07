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
  placeholder = 'Sélectionnez une date',
  'aria-invalid': ariaInvalid,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [, setInputValue] = useState(formatDate(value))
  const displayedValue = formatDate(value)

  function handleSelect(date?: Date) {
    setInputValue(formatDate(date))
    onChange(date)
    setOpen(false)
  }

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        value={displayedValue}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        onChange={(event) => {
          const value = event.target.value

          setInputValue(value)

          const date = new Date(value)

          if (!Number.isNaN(date.getTime())) {
            onChange(date)
          } else {
            onChange(undefined)
          }
        }}
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
