import z from 'zod'

export const referenceAnswerSchema = z.enum(['yes', 'no', 'skip'], {
  message: 'Veuillez sélectionner une réponse',
})

export const createReferenceSchema = z.object({
  paidOnTime: referenceAnswerSchema,
  wellMaintained: referenceAnswerSchema,
  communication: referenceAnswerSchema,
  recommended: referenceAnswerSchema,
  comment: z.string(),
})
