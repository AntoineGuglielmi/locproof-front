export type TypeActionResult<T = undefined> =
  | {
      success: true
      data?: T
    }
  | {
      success: false
      error: string
    }
