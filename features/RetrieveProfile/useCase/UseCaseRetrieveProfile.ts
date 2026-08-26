import { UseCase } from '@/shared/core/useCase/UseCase'
import { TypeContextRetrieveProfile } from '../types/TypeContextRetrieveProfile'
import { StepRetrieveTenant } from './steps/StepRetrieveTenant'
import { StepSendRetrieveProfileMailToTenant } from './steps/StepSendRetrieveProfileMailToTenant'

export class UseCaseRetrieveProfile extends UseCase<TypeContextRetrieveProfile> {
  steps = [StepRetrieveTenant, StepSendRetrieveProfileMailToTenant]
}
