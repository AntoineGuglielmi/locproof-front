import { TypeContextCheckRental } from '@/features/API/CheckRental/types/TypeContextCheckRental'
import { UseCaseCheckRental } from '@/features/API/CheckRental/useCase/UseCaseCheckRental'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rentalToken = searchParams.get('rentalToken')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const checkRentalContext: TypeContextCheckRental = {
    rentalToken,
    rental: null,
    result: null,
  }

  try {
    const useCase = new UseCaseCheckRental(checkRentalContext)

    await useCase.execute()

    return NextResponse.redirect(
      new URL(`/create-reference/${rentalToken}`, appUrl),
    )
  } catch (error) {
    let redirect

    switch (checkRentalContext.result) {
      case 'no-rental-token':
        redirect = 'no-rental-token'
        break
      case 'no-rental':
        redirect = 'no-rental'
        break

      case 'rental-expired':
        redirect = 'rental-expired'
        break

      case 'rental-already-validated':
        redirect = 'rental-already-validated'
        break

      default:
        redirect = 'unavailable'
        console.error(error)
    }

    return NextResponse.redirect(new URL(`/error/${redirect}`, appUrl))
  }
}
