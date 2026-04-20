import { rentalRepository } from '@/repositories/rental.repository'
import { referenceRepository } from '@/repositories/reference.repository'
import { generateToken } from '@/lib/token'

export async function createLocProof(input) {
  const rental = await rentalRepository.create({
    firstName: input.firstName,
    lastName: input.lastName,
    address: input.address,
    startDate: input.startDate,
    endDate: input.endDate,
    status: 'pending',
  })

  const token = generateToken()

  await referenceRepository.create({
    rental: rental.id,
    landlordEmail: input.landlordEmail,
    token,
    status: 'pending',
  })

  // TODO: email service
  // await sendEmail(...)

  return rental
}
