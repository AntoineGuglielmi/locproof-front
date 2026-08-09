import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import CreateReferenceForm from './create-reference-form'
import { ActionCreateReference } from '../actions/ActionCreateReference'

vi.mock('../actions/ActionCreateReference', () => ({
  ActionCreateReference: vi.fn(),
}))

describe('CreateReferenceForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits the reference and displays success message', async () => {
    vi.mocked(ActionCreateReference).mockResolvedValue({
      success: true,
    })

    const user = userEvent.setup()

    render(
      <CreateReferenceForm
        address="35 Rue Pelleport 33800 Bordeaux"
        startDate="2026-07-31"
        endDate="2026-08-29"
        firstname="Antoine"
        lastname="Guglielmi"
        rentalDocumentId="rental-123"
      />,
    )

    const yesRadios = screen.getAllByRole('radio', {
      name: 'Oui',
    })

    expect(yesRadios).toHaveLength(4)

    await user.click(yesRadios[0])
    await user.click(yesRadios[1])
    await user.click(yesRadios[2])
    await user.click(yesRadios[3])

    await user.click(
      screen.getByRole('button', {
        name: 'Envoyer mon retour',
      }),
    )

    expect(ActionCreateReference).toHaveBeenCalledWith({
      paidOnTime: 'yes',
      wellMaintained: 'yes',
      communication: 'yes',
      recommended: 'yes',
      comment: '',
      rentalDocumentId: 'rental-123',
    })

    expect(
      await screen.findByText('Merci pour votre recommandation !'),
    ).toBeInTheDocument()
  })
})
