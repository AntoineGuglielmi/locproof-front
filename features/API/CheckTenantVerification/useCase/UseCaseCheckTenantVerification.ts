import { UseCase } from '@/shared/core/useCase/UseCase'
import { TypeContextCheckTenantVerification } from '../types/TypeContextCheckTenantVerification'
import { StepCheckTenantVerificationToken } from './steps/StepCheckTenantVerificationToken'
import { StepRetrieveTenantVerification } from './steps/StepRetrieveTenantVerification'
import { StepValidateTenantVerification } from './steps/StepValidateTenantVerification'
import { StepCheckRental } from './steps/StepCheckRental'

export class UseCaseCheckTenantVerification extends UseCase<TypeContextCheckTenantVerification> {
  steps = [
    StepCheckTenantVerificationToken,
    StepRetrieveTenantVerification,
    StepValidateTenantVerification,
    StepCheckRental,
  ]
}
