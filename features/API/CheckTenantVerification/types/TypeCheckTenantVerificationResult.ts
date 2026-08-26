export type TypeCheckTenantVerificationResult =
  | 'no-verification-token'
  | 'no-verification'
  | 'verification-expired'
  | 'verification-already-validated'
