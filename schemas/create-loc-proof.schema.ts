import { z } from 'zod'

export const createLocProofSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(1),
    landlordEmail: z.email(),
    tenantEmail: z.email(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: 'Dates incohérentes',
    path: ['endDate'],
  })
