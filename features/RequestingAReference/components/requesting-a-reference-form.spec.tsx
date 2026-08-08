import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import RequestingAReferenceForm from './requesting-a-reference-form'
import { ActionRequestingAReference } from '../actions/ActionRequestingAReference'

vi.mock('../actions/ActionRequestingAReference', () => ({
  ActionRequestingAReference: vi.fn(),
}))

vi.mock('@/shared/components/form/address-autocomplete', () => ({
  AddressAutocomplete: ({
    id,
    value,
    onChange,
    placeholder,
  }: {
    id: string
    value?: {
      label: string
      city: string
    }
    onChange: (value: { label: string; city: string }) => void
    placeholder?: string
  }) => (
    <input
      id={id}
      value={value?.label ?? ''}
      placeholder={placeholder}
      onChange={() =>
        onChange({
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        })
      }
    />
  ),
}))

vi.mock('@/shared/components/form/date-picker', () => ({
  DatePicker: ({
    id,
    onChange,
  }: {
    id: string
    onChange: (value: Date) => void
  }) => (
    <button
      type="button"
      id={id}
      onClick={() => onChange(new Date('2026-07-31'))}
    >
      Sélectionner une date
    </button>
  ),
}))

describe('RequestingAReferenceForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits the reference request and displays success message', async () => {
    vi.mocked(ActionRequestingAReference).mockResolvedValue({
      success: true,
    })

    const user = userEvent.setup()

    render(
      <RequestingAReferenceForm
        email="tenant@example.com"
        firstname="Antoine"
        lastname="Guglielmi"
        tenantVerificationToken="verification-token"
      />,
    )

    const landlordEmail = screen.getByLabelText('Email du bailleur')

    await user.clear(landlordEmail)
    await user.type(landlordEmail, 'landlord@example.com')

    const address = screen.getByLabelText('Adresse')
    await user.type(address, '35 Rue Pelleport')

    const datePickers = screen.getAllByRole('button', {
      name: /Date de (début|fin) de location/,
    })

    await user.click(datePickers[0])
    await user.click(datePickers[1])

    await user.click(
      screen.getByRole('button', {
        name: 'Demander une recommandation',
      }),
    )

    expect(ActionRequestingAReference).toHaveBeenCalledWith({
      email: 'tenant@example.com',
      firstname: 'Antoine',
      lastname: 'Guglielmi',
      address: {
        label: '35 Rue Pelleport 33800 Bordeaux',
        city: 'Bordeaux',
      },
      startDate: new Date('2026-07-31'),
      endDate: new Date('2026-07-31'),
      landlordEmail: 'landlord@example.com',
      tenantVerificationToken: 'verification-token',
    })

    expect(
      await screen.findByText('Votre demande a bien été envoyée'),
    ).toBeInTheDocument()
  })
})
