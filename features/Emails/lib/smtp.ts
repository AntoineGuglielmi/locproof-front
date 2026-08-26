'server-only'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import type { ReactElement } from 'react'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendEmailViaSmtp = async ({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: ReactElement
}) => {
  const html = await render(react)
  const from = 'LocProof <hello@locproof.fr>'

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  })
}
