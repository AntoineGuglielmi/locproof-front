export abstract class Step<TContext> {
  abstract execute(context: TContext): Promise<void>
}
