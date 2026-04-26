'use server'

import { createLocProofSchema } from '@/schemas/create-loc-proof.schema'
import { createLocProof } from '@/services/create-loc-proof'
import { CreateLocProofInput } from '@/types/loc-proof'

export async function createLocProofAction(data: CreateLocProofInput) {
  const parsed = createLocProofSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    }
  }

  try {
    await createLocProof(data)

    return { success: true }
  } catch (error) {
    console.error('Error: ', error)
    return {
      success: false,
      error: 'Erreur serveur',
    }
  }
}
