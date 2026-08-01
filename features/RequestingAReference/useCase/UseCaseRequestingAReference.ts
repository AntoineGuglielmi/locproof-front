import { UseCase } from '@/shared/core/useCase/UseCase'
import { StepGetTenantVerification } from './steps/StepGetTenantVerification'
import { StepGetTenant } from './steps/StepGetTenant'
import { StepCreateRental } from './steps/StepCreateRental'
import { StepValidateTenantVerification } from './steps/StepValidateTenantVerification'
import { StepSendEmailToLandlord } from './steps/StepSendEmailToLandlord'
import { TypeContextRequestingAReference } from '../types/TypeContextRequestingAReference'

export class UseCaseRequestingAReference extends UseCase<TypeContextRequestingAReference> {
  steps = [
    StepGetTenantVerification,
    StepGetTenant,
    StepCreateRental,
    StepValidateTenantVerification,
    StepSendEmailToLandlord,
  ]
}
