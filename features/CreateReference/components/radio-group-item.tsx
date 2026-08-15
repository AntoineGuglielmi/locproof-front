import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/shadcn/ui/field'
import {
  RadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from '@/shared/components/shadcn/ui/radio-group'
import { Controller, UseFormReturn } from 'react-hook-form'
import { TypeQuestion } from '../types/TypeQuestion'
import { TypeCreateReferenceFormValues } from '../types/TypeCreateReferenceFormValues'

type RadioGroupItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  form: UseFormReturn<TypeCreateReferenceFormValues>
} & TypeQuestion

export default function RadioGroupItem({
  legend,
  name,
  description,
  form,
}: RadioGroupItemProps) {
  const idYes = `${name}-yes`
  const idNo = `${name}-no`
  const idSkip = `${name}-skip`

  return (
    <Controller
      key={name}
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet
          className="w-full text-gray-800"
          name={name}
        >
          <FieldLegend
            className={`text-left ${!!form.formState.errors[name] ? 'text-destructive' : ''}`}
            variant="label"
            data-invalid={!!form.formState.errors[name]}
          >
            {legend} ?
          </FieldLegend>

          {description && <FieldDescription>{description}</FieldDescription>}

          <RadioGroup
            value={field.value ?? ''}
            onValueChange={field.onChange}
          >
            <Field
              orientation="horizontal"
              className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
            >
              <ShadcnRadioGroupItem
                value="yes"
                id={idYes}
                className="cursor-pointer"
              />
              <FieldLabel
                htmlFor={idYes}
                className="font-normal cursor-pointer"
              >
                Oui
              </FieldLabel>
            </Field>

            <Field
              orientation="horizontal"
              className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
            >
              <ShadcnRadioGroupItem
                value="no"
                id={idNo}
                className="cursor-pointer"
              />
              <FieldLabel
                htmlFor={idNo}
                className="font-normal cursor-pointer"
              >
                Non
              </FieldLabel>
            </Field>

            <Field
              orientation="horizontal"
              className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
            >
              <ShadcnRadioGroupItem
                value="skip"
                id={idSkip}
                className="cursor-pointer"
              />
              <FieldLabel
                htmlFor={idSkip}
                className="font-normal text-muted-foreground cursor-pointer"
              >
                Je ne souhaite pas répondre
              </FieldLabel>
            </Field>
          </RadioGroup>

          {fieldState.error && <AnimatedFieldError error={fieldState.error} />}
        </FieldSet>
      )}
    />
  )
}
