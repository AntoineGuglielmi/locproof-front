import { rentalRepository } from '@/repositories/rental.repository'
import { referenceRepository } from '@/repositories/reference.repository'
import { generateToken } from '@/lib/token'
import { tenantRepository } from '@/repositories/tenant.repository'

export async function createLocProof(input) {
  console.log({
    inputOnCreateLocProof: input,
  })
  const token = generateToken()
  const tenant = await tenantRepository.create({
    firstname: input.firstName,
    lastname: input.lastName,
    email: input.tenantEmail,
    emailVerificationToken: token,
  })

  //   const rental = await rentalRepository.create({
  //     firstName: input.firstName,
  //     lastName: input.lastName,
  //     address: input.address,
  //     startDate: input.startDate,
  //     endDate: input.endDate,
  //     status: 'pending',
  //   })

  //   await referenceRepository.create({
  //     rental: rental.id,
  //     landlordEmail: input.landlordEmail,
  //     token,
  //     status: 'pending',
  //   })

  // TODO: email service
  // await sendEmail(...)

  //   return rental
}
