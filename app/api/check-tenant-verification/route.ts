import { NextResponse } from 'next/server'
import { TypeContextCheckTenantVerification } from '@/features/API/CheckTenantVerification/types/TypeContextCheckTenantVerification'
import { UseCaseCheckTenantVerification } from '@/features/API/CheckTenantVerification/useCase/UseCaseCheckTenantVerification'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tenantVerificationToken = searchParams.get('tenantVerificationToken')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const checkTenantVerificationContext: TypeContextCheckTenantVerification = {
    tenantVerificationToken,
    tenantVerification: null,
    result: null,
  }

  try {
    const useCase = new UseCaseCheckTenantVerification(
      checkTenantVerificationContext,
    )

    await useCase.execute()

    return NextResponse.redirect(
      new URL(`/request-reference/${tenantVerificationToken}`, appUrl),
    )
  } catch (error) {
    let redirect

    switch (checkTenantVerificationContext.result) {
      case 'no-verification-token':
        redirect = 'no-verification-token'
        break
      case 'no-verification':
        redirect = 'no-verification'
        break

      case 'verification-expired':
        redirect = 'rental-expired'
        break

      case 'verification-already-validated':
        redirect = 'rental-already-validated'
        break

      default:
        redirect = 'unavailable'
        console.error(error)
    }

    return NextResponse.redirect(new URL(`/error/${redirect}`, appUrl))
  }
}
