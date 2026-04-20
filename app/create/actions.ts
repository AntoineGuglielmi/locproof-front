'use server'

import { createLocProofSchema } from '@/schemas/create-loc-proof.schema'
import { createLocProof } from '@/services/create-loc-proof'

export async function createLocProofAction(data: unknown) {
  const parsed = createLocProofSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    }
  }

  try {
    await createLocProof(parsed.data)

    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Erreur serveur',
    }
  }
}
