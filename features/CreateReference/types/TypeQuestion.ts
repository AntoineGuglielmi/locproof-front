import { TypeCreateReferenceFormValues } from './TypeCreateReferenceFormValues'

export type TypeQuestion = {
  legend: string
  description?: string
  name: keyof Pick<
    TypeCreateReferenceFormValues,
    'paidOnTime' | 'wellMaintained' | 'communication' | 'recommended'
  >
}
