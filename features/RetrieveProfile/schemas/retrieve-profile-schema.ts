import { z } from 'zod'

export const retrieveProfileSchema = z.object({
  email: z.email('Veuillez saisir une adresse email valide'),
})

export type RetriveProfileFormValues = z.infer<typeof retrieveProfileSchema>
