import { Reference, Rental } from './strapi-types'

export type TypeRentalReference = {
  id: string
  cityPublic: Rental['cityPublic']
  startDate: string
  endDate: string
  comment: Reference['comment']
  communication: Reference['communication']
  paidOnTime: Reference['paidOnTime']
  recommended: Reference['recommended']
  wellMaintained: Reference['wellMaintained']
}

export type TypeSynthesis = {
  references: Array<TypeRentalReference>
  scores: {
    communication: number
    paidOnTime: number
    recommended: number
    wellMaintained: number
  }
  referencesCount: number
}
