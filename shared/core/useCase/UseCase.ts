import { StepConstructor } from '@/shared/types/StepConstructor'

export abstract class UseCase<TContext> {
  constructor(protected readonly context: TContext) {}

  protected abstract steps: Array<StepConstructor<TContext>>

  async execute(): Promise<void> {
    for (const Step of this.steps) {
      const step = new Step()
      await step.execute(this.context)
    }
  }
}
