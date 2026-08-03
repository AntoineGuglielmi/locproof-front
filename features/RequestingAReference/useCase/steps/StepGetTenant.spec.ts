import { StepGetTenant } from './StepGetTenant'
import { ServiceCreateTenant } from '../../services/ServiceCreateTenant'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'
import { Tenant } from '@/shared/types/strapi-types'

vi.mock('../../services/ServiceCreateTenant', () => ({
  ServiceCreateTenant: vi.fn(),
}))

describe('StepGetTenant', () => {
  it('creates a tenant from form input', async () => {
    const tenant: Tenant = {
      id: 2,
      documentId: 'lvb44rzxv6m5ea6ih76cu0ch',
      firstname: 'John',
      lastname: 'Doe',
      email: 'okaysaly@gmail.com',
      slug: 'john-doe-2',
      createdAt: '2026-05-17 01:46:14.484000',
      updatedAt: '2026-08-01 22:30:49.962000',
      publishedAt: '2026-08-01 22:30:49.949000',
      verified: true,
    }

    vi.mocked(ServiceCreateTenant).mockResolvedValue(tenant)

    const context = {
      formInput: {
        email: 'test@test.com',
        firstname: 'Antoine',
        lastname: 'G',
      },
    } as TypeContextRequestingAReference

    await new StepGetTenant().execute(context)

    expect(ServiceCreateTenant).toHaveBeenCalledWith({
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    })

    expect(context.tenant).toEqual(tenant)
  })
})
