import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import ValidateEmailForm from './validate-email-form'
import { ActionValidateEmail } from '../actions/ActionValidateEmail'

vi.mock('../actions/ActionValidateEmail', () => ({
  ActionValidateEmail: vi.fn(),
}))

describe('ValidateEmailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits email and displays success message', async () => {
    vi.mocked(ActionValidateEmail).mockResolvedValue({
      success: true,
    })

    const user = userEvent.setup()

    render(<ValidateEmailForm />)

    const input = screen.getByLabelText('Votre email')

    await user.type(input, 'hello@example.com')

    await user.click(
      screen.getByRole('button', {
        name: 'Recevoir mon lien sécurisé',
      }),
    )

    expect(ActionValidateEmail).toHaveBeenCalledWith({
      email: 'hello@example.com',
    })

    expect(
      await screen.findByText('Vérifiez votre boîte mail'),
    ).toBeInTheDocument()
  })
})
