import { Reference, Rental } from './strapi-types'

export type TypeRentalReference = {
  id: string
  address: Rental['address']
  endDate: string
  startDate: string
  comment: Reference['comment']
  communication: Reference['communication']
  paidOnTime: Reference['paidOnTime']
  recommended: Reference['recommended']
  wellMaintained: Reference['wellMaintained']
  cityPublic: Rental['cityPublic']
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
