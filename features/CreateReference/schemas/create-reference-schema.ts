import z from 'zod'

export const referenceAnswerSchema = z
  .enum(['yes', 'no', 'skip'])
  .optional()
  .refine((value) => value !== undefined, {
    message: 'Veuillez sélectionner une réponse',
  })

export const createReferenceSchema = z.object({
  paidOnTime: referenceAnswerSchema,
  wellMaintained: referenceAnswerSchema,
  communication: referenceAnswerSchema,
  recommended: referenceAnswerSchema,
  comment: z.string(),
  rentalDocumentId: z.string(),
})
