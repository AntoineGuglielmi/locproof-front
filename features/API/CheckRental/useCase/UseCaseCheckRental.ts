import { UseCase } from '@/shared/core/useCase/UseCase'
import { StepGetRental } from './steps/StepGetRental'
import { StepValidateRental } from './steps/StepValidateRental'
import { StepCheckReference } from './steps/StepCheckReference'

export class UseCaseCheckRental extends UseCase<object> {
  steps = [StepGetRental, StepValidateRental, StepCheckReference]
}
