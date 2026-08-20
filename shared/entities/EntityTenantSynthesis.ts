import { dateShort } from '@/shared/lib/date'
import { referenceRepository } from '@/repositories/reference.repository'
import { Reference, Tenant } from '../types/strapi-types'
import { TypeRentalReference, TypeSynthesis } from '../types/profile-synthesis'

export class EntityTenantSynthesis {
  constructor(private readonly _tenant: Tenant) {}

  async getSynthesis(): Promise<TypeSynthesis> {
    const references = await this.generateReferences()

    return {
      references,
      referencesCount: references.length,
      scores: this.generateScores(references),
    }
  }

  private async generateReferences(): Promise<TypeRentalReference[]> {
    const references = await referenceRepository.findByTenant(
      this._tenant.documentId,
    )

    return references
      .filter((reference) => reference.rental)
      .map((reference) => this.mapReference(reference))
  }

  private mapReference(reference: Reference): TypeRentalReference {
    const {
      documentId: referenceDocumentId,
      comment,
      communication,
      paidOnTime,
      recommended,
      wellMaintained,
      rental,
    } = reference

    const {
      documentId: rentalDocumentId,
      cityPublic,
      startDate,
      endDate,
    } = rental!

    return {
      id: `${rentalDocumentId}-${referenceDocumentId}`,
      cityPublic,
      startDate: dateShort(startDate!),
      endDate: dateShort(endDate!),
      comment,
      communication,
      paidOnTime,
      recommended,
      wellMaintained,
    }
  }

  private generateScores(
    references: TypeRentalReference[],
  ): TypeSynthesis['scores'] {
    const referencesCount = references.length

    const scores: TypeSynthesis['scores'] = {
      communication: 0,
      paidOnTime: 0,
      recommended: 0,
      wellMaintained: 0,
    }

    if (referencesCount === 0) {
      return scores
    }

    for (const key of Object.keys(scores)) {
      const scoreKey = key as keyof typeof scores

      scores[scoreKey] =
        references.filter((reference) => reference[scoreKey] === 'yes').length /
        referencesCount
    }

    return scores
  }
}
