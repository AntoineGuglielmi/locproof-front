import { Step } from '../core/useCase/Step'

export type StepConstructor<TContext> = new () => Step<TContext>
