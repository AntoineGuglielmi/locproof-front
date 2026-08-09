import { UseCase } from '@/shared/core/useCase/UseCase'
import { TypeContextCreateReference } from '../types/TypeContextCreateReference'
import { StepCreateReference } from './steps/StepCreateReference'
import { StepValidateRental } from './steps/StepValidateRental'
import { StepRetrieveRental } from './steps/StepRetrieveRental'
import { StepRetrieveTenant } from './steps/StepRetrieveTenant'
import { StepSendEmailToTenant } from './steps/StepSendEmailToTenant'

export class UseCaseCreateReference extends UseCase<TypeContextCreateReference> {
  steps = [
    StepRetrieveRental,
    StepRetrieveTenant,
    StepCreateReference,
    StepValidateRental,
    StepSendEmailToTenant,
  ]
}
