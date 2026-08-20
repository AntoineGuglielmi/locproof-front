import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { ActionRetrieveProfile } from '../actions/ActionRetrieveProfile'
import RetrieveProfileForm from './retrieve-profile-form'

vi.mock('../actions/ActionRetrieveProfile', () => ({
  ActionRetrieveProfile: vi.fn(),
}))

describe('RetrieveProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits email and displays success message', async () => {
    vi.mocked(ActionRetrieveProfile).mockResolvedValue({
      success: true,
    })

    const user = userEvent.setup()

    render(<RetrieveProfileForm />)

    const input = screen.getByLabelText('Adresse email')

    await user.type(input, 'hello@example.com')

    await user.click(
      screen.getByRole('button', {
        name: 'Recevoir mon lien',
      }),
    )

    expect(ActionRetrieveProfile).toHaveBeenCalledWith({
      email: 'hello@example.com',
    })

    expect(
      await screen.findByText('Vérifiez votre boîte mail'),
    ).toBeInTheDocument()
  })
})
