'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'

export function DatePicker({
  placeholder = 'Select date',
  onChange,
  value,
}: {
  placeholder?: string
  onChange?: (date: Date) => void
  value?: Date
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(value)

  useEffect(() => {
    setDate(value)
  }, [value])

  return (
    <Field className="w-full">
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal"
          >
            {date ? date.toLocaleDateString() : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
              onChange?.(date)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
