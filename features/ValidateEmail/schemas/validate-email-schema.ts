import { z } from 'zod'

export const validateEmailSchema = z.object({
  email: z.email('Veuillez saisir une adresse email valide'),
})

export type ValidateEmailFormValues = z.infer<typeof validateEmailSchema>
