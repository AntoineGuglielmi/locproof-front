import { dateShort } from '@/lib/date'
import { referenceRepository } from '@/repositories/reference.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { Reference, Rental, Tenant } from '@/types/strapi-types'

type TypeRentalReference = {
  id: string
  address: Rental['address']
  endDate: string
  startDate: string
  comment: Reference['comment']
  communication: Reference['communication']
  paidOnTime: Reference['paidOnTime']
  recommended: Reference['recommended']
  wellMaintained: Reference['wellMaintained']
  cityPublic: Rental['cityPublic']
}

type TypeSynthesis = {
  references: Array<TypeRentalReference>
  scores: {
    communication: number
    paidOnTime: number
    recommended: number
    wellMaintained: number
  }
}

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
    const rentals = await rentalRepository.findByTenantDocumentId(
      this._tenant.documentId,
    )
    for (const rental of rentals) {
      const reference = await referenceRepository.findByRentalDocumentId(
        rental.documentId,
      )
      this._synthesis.references.push(
        this.mergeRentalAndReference(rental, reference!),
      )
    }
  }

  private async generateScores() {
    const referencesNumber = this._synthesis.references.length
    Object.keys(this._synthesis.scores).map((key) => {
      const scoreKey = key as keyof typeof this._synthesis.scores
      this._synthesis.scores[scoreKey] =
        this._synthesis.references.reduce((number, reference) => {
          if (reference[scoreKey]!) {
            number++
          }
          return number
        }, 0) / referencesNumber
    })
  }

  mergeRentalAndReference(
    rental: Rental,
    reference: Reference,
  ): TypeRentalReference {
    const {
      address,
      endDate,
      startDate,
      documentId: rentalDocumentId,
      cityPublic,
    } = rental
    const {
      comment,
      communication,
      paidOnTime,
      recommended,
      wellMaintained,
      documentId: referenceDocumentId,
    } = reference
    return {
      id: `${rentalDocumentId}-${referenceDocumentId}`,
      address,
      endDate: dateShort(endDate!),
      startDate: dateShort(startDate!),
      comment,
      communication,
      paidOnTime,
      recommended,
      wellMaintained,
      cityPublic,
    }
  }
}
