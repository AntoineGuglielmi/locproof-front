import { UseCase } from '@/shared/core/useCase/UseCase'
import { TypeContextValidateEmail } from '../types/TypeContextValidateEmail'
import { StepCreateNewTenantVerification } from './steps/StepCreateNewTenantVerification'
import { StepSendValidationEmail } from './steps/StepSendValidationEmail'
import { StepDeletePendingTenantVerification } from './steps/StepDeletePendingTenantVerification'

export class UseCaseValidateEmail extends UseCase<TypeContextValidateEmail> {
  steps = [
    StepDeletePendingTenantVerification,
    StepCreateNewTenantVerification,
    StepSendValidationEmail,
  ]
}
