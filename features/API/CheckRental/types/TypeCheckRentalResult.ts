export type TypeCheckRentalResult =
  | 'no-rental'
  | 'no-rental-token'
  | 'rental-expired'
  | 'rental-already-validated'
