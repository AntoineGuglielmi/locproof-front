import { Step } from './Step'
import { UseCase } from './UseCase'

describe('UseCase', () => {
  let calls: string[]

  beforeEach(() => {
    calls = []
  })

  class StepA extends Step<object> {
    async execute() {
      calls.push('A')
    }
  }

  class StepB extends Step<object> {
    async execute() {
      calls.push('B')
    }
  }

  class TestUseCase extends UseCase<object> {
    protected steps = [StepA, StepB]
  }

  it('executes every step in order', async () => {
    await new TestUseCase({}).execute()

    expect(calls).toEqual(['A', 'B'])
  })

  it('passes the same context to every step', async () => {
    const receivedContexts: object[] = []

    class StepA extends Step<object> {
      async execute(context: object) {
        receivedContexts.push(context)
      }
    }

    class StepB extends Step<object> {
      async execute(context: object) {
        receivedContexts.push(context)
      }
    }

    class ContextUseCase extends UseCase<object> {
      protected steps = [StepA, StepB]
    }

    const context = { foo: 'bar' }

    await new ContextUseCase(context).execute()

    expect(receivedContexts).toHaveLength(2)
    expect(receivedContexts[0]).toBe(context)
    expect(receivedContexts[1]).toBe(context)
  })

  it('stops execution when a step throws', async () => {
    const calls: string[] = []

    class StepA extends Step<object> {
      async execute() {
        calls.push('A')
      }
    }

    class FailingStep extends Step<object> {
      async execute() {
        calls.push('ERROR')
        throw new Error('boom')
      }
    }

    class StepC extends Step<object> {
      async execute() {
        calls.push('C')
      }
    }

    class ErrorUseCase extends UseCase<object> {
      protected steps = [StepA, FailingStep, StepC]
    }

    await expect(new ErrorUseCase({}).execute()).rejects.toThrow('boom')

    expect(calls).toEqual(['A', 'ERROR'])
  })

  it('executes steps sequentially', async () => {
    const calls: string[] = []

    class StepA extends Step<object> {
      async execute() {
        await new Promise((resolve) => setTimeout(resolve, 20))

        calls.push('A')
      }
    }

    class StepB extends Step<object> {
      async execute() {
        calls.push('B')
      }
    }

    class SequentialUseCase extends UseCase<object> {
      protected steps = [StepA, StepB]
    }

    await new SequentialUseCase({}).execute()

    expect(calls).toEqual(['A', 'B'])
  })
})
