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
})
