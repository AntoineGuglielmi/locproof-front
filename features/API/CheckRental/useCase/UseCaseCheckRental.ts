import { UseCase } from '@/shared/core/useCase/UseCase'
import { StepGetRental } from './steps/StepGetRental'
import { StepValidateRental } from './steps/StepValidateRental'
import { StepCheckReference } from './steps/StepCheckReference'
import { StepCheckRentalToken } from './steps/StepCheckRentalToken'
import { TypeContextCheckRental } from '../types/TypeContextCheckRental'

export class UseCaseCheckRental extends UseCase<TypeContextCheckRental> {
  steps = [
    StepCheckRentalToken,
    StepGetRental,
    StepValidateRental,
    StepCheckReference,
  ]
}
