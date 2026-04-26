import { ServiceCheckRentalToken } from '@/services/ServiceCheckRentalToken'
import { NextResponse } from 'next/server'
// import { ServiceCheckTenantToken } from '@/services/ServiceCheckTenantToken'
// import { tenantRepository } from '@/repositories/tenant.repository'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rentalToken = searchParams.get('rentalToken')
  if (!rentalToken) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  console.log({
    rentalToken,
  })
  const { ok, redirectTo } = await ServiceCheckRentalToken({
    rentalToken,
  })
  const res = NextResponse.redirect(new URL(redirectTo, req.url))
  //   if (ok) {
  //     let cookieValue = ''
  //     const tenant = await tenantRepository.findByEmail(email!)
  //     if (tenant) {
  //       cookieValue = tenant.documentId!
  //     } else {
  //       cookieValue = email!
  //     }
  //     res.cookies.set('tenant_context', cookieValue, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       maxAge: 60 * 60 * 24,
  //       sameSite: 'lax',
  //       path: '/',
  //     })
  //   }
  return res
}
