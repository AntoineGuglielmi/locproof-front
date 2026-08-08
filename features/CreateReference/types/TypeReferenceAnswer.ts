import z from 'zod'
import { referenceAnswerSchema } from '../schemas/create-reference-schema'

export type TypeReferenceAnswer = z.infer<typeof referenceAnswerSchema>
