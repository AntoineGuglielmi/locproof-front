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
  const res = NextResponse.redirect(new URL(redirectTo, req.url))
  return res
}
