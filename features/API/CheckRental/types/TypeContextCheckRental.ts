import { Rental } from '@/shared/types/strapi-types'
import { TypeCheckRentalResult } from './TypeCheckRentalResult'

export type TypeContextCheckRental = {
  rental?: Rental | null
  rentalToken?: Rental['rentalToken'] | null
  result?: TypeCheckRentalResult | null
}
