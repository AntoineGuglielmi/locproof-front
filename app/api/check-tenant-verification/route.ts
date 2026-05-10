import { NextResponse } from 'next/server'
import { ServiceCheckTenantToken } from '@/services/ServiceCheckTenantToken'
import { tenantRepository } from '@/repositories/tenant.repository'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tenantVerificationToken = searchParams.get('tenantVerificationToken')

  if (!tenantVerificationToken) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { ok, redirectTo, email } = await ServiceCheckTenantToken({
    tenantVerificationToken,
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const res = NextResponse.redirect(new URL(redirectTo, appUrl))

  if (ok) {
    let cookieValue = ''
    const tenant = await tenantRepository.findByEmail(email!)

    if (tenant) {
      cookieValue = tenant.documentId!
    } else {
      cookieValue = email!
    }

    res.cookies.set('tenant_context', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      path: '/',
    })
  }

  return res
}
