import { sendValidationEmail } from '@/lib/email'
import { generateToken } from '@/lib/token'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { Tenant } from '@/types/strapi-types'

export const ServiceInitDossier = async ({
  email,
}: {
  email: Tenant['email']
}) => {
  await tenantVerificationRepository.deletePendingByEmail(email)

  const tenantVerificationToken = generateToken()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
  await tenantVerificationRepository.create({
    email,
    tenantVerificationToken,
    expiresAt,
  })
  await sendValidationEmail({
    to: email!,
    tenantVerificationToken,
  })
}
