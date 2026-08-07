import { Controller, UseFormReturn } from 'react-hook-form'
import { RequestingAReferenceFormValues } from '../../schemas/requesting-a-reference-schema'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/shadcn/ui/field'
import { Input } from '@/shared/components/shadcn/ui/input'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'
import { DatePicker } from '@/shared/components/form/date-picker'

type RentalInformationFields = {
  form: UseFormReturn<RequestingAReferenceFormValues>
}

export default function RentalInformationFields({
  form,
}: RentalInformationFields) {
  return (
    <FieldSet className="w-full">
      <FieldLegend className="text-left">Le logement concerné</FieldLegend>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.address}>
          <FieldLabel htmlFor="address">Adresse</FieldLabel>

          <Controller
            control={form.control}
            name="address"
            render={({ field }) => (
              <AddressAutocomplete
                placeholder="Commencez à taper l'adresse du bien"
                onChange={field.onChange}
              />
            )}
          />
          <AnimatedFieldError error={form.formState.errors.address} />

          <Input
            type="hidden"
            aria-invalid={form.formState.errors.cityPublic ? true : undefined}
            {...form.register('cityPublic')}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field data-invalid={!!form.formState.errors.startDate}>
            <FieldLabel htmlFor="firstname">
              Date de début de location
            </FieldLabel>

            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  placeholder="Sélectionnez une date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <AnimatedFieldError error={form.formState.errors.startDate} />
          </Field>
          <Field data-invalid={!!form.formState.errors.endDate}>
            <FieldLabel htmlFor="lastname">Date de fin de location</FieldLabel>

            <Controller
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  placeholder="Sélectionnez une date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <AnimatedFieldError error={form.formState.errors.endDate} />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}
