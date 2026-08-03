import { dateShort } from '@/lib/date'
import { ucfirst } from '@/lib/string'
import { Reference, Rental } from '@/shared/types/strapi-types'

export class EntityReferenceRental {
  private _id: string
  private _documentId: Rental['documentId']
  private _address: Rental['address']
  private _startDate: Rental['startDate']
  private _endDate: Rental['endDate']
  private _paidOnTime: Reference['paidOnTime']
  private _wellMaintained: Reference['wellMaintained']
  private _communication: Reference['communication']
  private _recommended: Reference['recommended']
  private _comment: Reference['comment']

  constructor({
    id,
    documentId,
    address,
    startDate,
    endDate,
    paidOnTime,
    wellMaintained,
    communication,
    recommended,
    comment,
  }: {
    id: string
    documentId: Rental['documentId']
    address: Rental['address']
    startDate: Rental['startDate']
    endDate: Rental['endDate']
    paidOnTime: Reference['paidOnTime']
    wellMaintained: Reference['wellMaintained']
    communication: Reference['communication']
    recommended: Reference['recommended']
    comment: Reference['comment']
  }) {
    this._id = id
    this._documentId = documentId
    this._address = address
    this._startDate = startDate
    this._endDate = endDate
    this._paidOnTime = paidOnTime
    this._wellMaintained = wellMaintained
    this._communication = communication
    this._recommended = recommended
    this._comment = comment
  }

  get id() {
    return this._id
  }

  get documentId() {
    return this._documentId
  }

  get address() {
    return this._address
  }

  get startDate() {
    return ucfirst(dateShort(this._startDate!))
  }

  get endDate() {
    return ucfirst(dateShort(this._endDate!))
  }

  get paidOnTime() {
    return this._paidOnTime
  }

  get wellMaintained() {
    return this._wellMaintained
  }

  get communication() {
    return this._communication
  }

  get recommended() {
    return this._recommended
  }

  get comment() {
    return this._comment
  }
}
