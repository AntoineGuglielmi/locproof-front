import z from 'zod'
import { createReferenceSchema } from '../schemas/create-reference-schema'

export type TypeCreateReferenceFormValues = z.infer<
  typeof createReferenceSchema
>
