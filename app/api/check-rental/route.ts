import { ServiceCheckRentalToken } from '@/services/ServiceCheckRentalToken'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rentalToken = searchParams.get('rentalToken')
  if (!rentalToken) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { redirectTo } = await ServiceCheckRentalToken({
    rentalToken,
  })
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const res = NextResponse.redirect(new URL(redirectTo, appUrl))
  return res
}
