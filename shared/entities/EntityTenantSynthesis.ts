import { dateShort } from '@/shared/lib/date'
import { referenceRepository } from '@/repositories/reference.repository'
import { Tenant } from '../types/strapi-types'
import { TypeRentalReference, TypeSynthesis } from '../types/profile-synthesis'

export class EntityTenantSynthesis {
  private _tenant: Tenant
  private _synthesis: TypeSynthesis = {
    references: [],
    scores: {
      communication: 0,
      paidOnTime: 0,
      recommended: 0,
      wellMaintained: 0,
    },
    referencesCount: 0,
  }

  constructor(tenant: Tenant) {
    this._tenant = tenant
  }

  async getSynthesis() {
    await this.generateRentalReferences()
    this.generateScores()
    return this._synthesis
  }

  private async generateRentalReferences() {
    const references = await referenceRepository.findByTenant(
      this._tenant.documentId,
    )
    if (references.length >= 1) {
      this._synthesis.references = references.reduce(
        (acc: TypeRentalReference[], curr) => {
          if (!curr.rental) return acc
          const {
            comment,
            communication,
            documentId: referenceDocumentId,
            paidOnTime,
            recommended,
            wellMaintained,
            rental: {
              cityPublic,
              startDate,
              endDate,
              documentId: rentalDocumentId,
            },
          } = curr
          acc.push({
            id: `${rentalDocumentId}-${referenceDocumentId}`,
            cityPublic,
            startDate: dateShort(startDate!),
            endDate: dateShort(endDate!),
            comment,
            communication,
            paidOnTime,
            recommended,
            wellMaintained,
          })
          return acc
        },
        [],
      )
    }
  }

  private async generateScores() {
    const referencesCount = this._synthesis.references.length
    Object.keys(this._synthesis.scores).map((key) => {
      if (referencesCount === 0) {
        return 0
      }
      this._synthesis.referencesCount = referencesCount
      const scoreKey = key as keyof typeof this._synthesis.scores
      this._synthesis.scores[scoreKey] =
        this._synthesis.references.reduce((number, reference) => {
          if (reference[scoreKey] === 'yes') {
            number++
          }
          return number
        }, 0) / referencesCount
    })
  }
}
