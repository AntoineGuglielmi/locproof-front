import z from 'zod'

export const requestingAReferenceSchema = z
  .object({
    email: z.email(),
    firstname: z.string().min(3, 'Le prénom est obligatoire'),
    lastname: z.string().min(3, 'Le nom est obligatoire'),
    address: z.string().min(1, "L'adresse est obligatoire"),
    cityPublic: z.string(),
    startDate: z.date({
      error: 'Vous devez renseinger une date de début de location',
    }),
    endDate: z.date({
      error: 'Vous devez renseigner une date de fin de location',
    }),
    landlordEmail: z.email("L'email du bailleur est invalide"),
    tenantVerificationToken: z.string(),
  })
  .refine(
    (data) =>
      process.env.NODE_ENV === 'development' ||
      data.email !== data.landlordEmail,
    {
      path: ['landlordEmail'],
      message:
        "L'email du bailleur ne peut pas être le même que celui du locataire.",
    },
  )

export type RequestingAReferenceFormValues = z.infer<
  typeof requestingAReferenceSchema
>
