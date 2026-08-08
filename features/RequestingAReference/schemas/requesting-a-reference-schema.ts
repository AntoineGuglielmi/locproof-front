import z from 'zod'

export const requestingAReferenceSchema = z
  .object({
    email: z.email(),
    firstname: z.string().min(3, 'Le prénom est obligatoire'),
    lastname: z.string().min(3, 'Le nom est obligatoire'),
    address: z
      .object(
        {
          label: z.string(),
          city: z.string(),
        },
        {
          error: 'Veuillez sélectionner une adresse',
        },
      )
      .refine(({ label, city }) => Boolean(label && city), {
        message: 'Veuillez sélectionner une adresse',
      }),
    startDate: z
      .date({
        error: 'Vous devez renseigner une date de début de location',
      })
      .optional(),
    endDate: z
      .date({
        error: 'Vous devez renseigner une date de fin de location',
      })
      .optional(),
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
  .refine(
    ({ startDate, endDate }) => !startDate || !endDate || endDate >= startDate,
    {
      message: 'La date de fin doit être après la date de début',
      path: ['endDate'],
    },
  )
  .refine(({ startDate }) => !!startDate, {
    path: ['startDate'],
    message: 'Vous devez renseigner une date de début de location',
  })
  .refine(({ endDate }) => !!endDate, {
    path: ['endDate'],
    message: 'Vous devez renseigner une date de fin de location',
  })

export type RequestingAReferenceFormValues = z.infer<
  typeof requestingAReferenceSchema
>
