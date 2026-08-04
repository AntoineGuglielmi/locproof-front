# LocProof

> Building trust in the rental market through verified landlord recommendations.

LocProof is a web application that helps tenants build a trusted rental reputation by collecting verified recommendations from previous landlords.

Unlike traditional rental applications that rely almost exclusively on administrative documents (income, employment contracts, tax notices...), LocProof focuses on what really matters to future landlords:

- Were the rent payments made on time?
- Was the property well maintained?
- Was communication respectful?
- Would the landlord rent to this tenant again?

The result is a trustworthy, shareable profile that helps tenants demonstrate their reliability while making rental decisions easier for landlords.

---

> 🚧 **Current status**
>
> LocProof is currently in its validation phase. The application is functional,
> but the current priority is to validate the concept with real estate professionals
> before investing in larger features.

---

## Why LocProof?

Finding a rental property is often stressful for both parties.

Tenants spend time gathering administrative documents that say very little about their actual behaviour as renters.

Landlords, on the other hand, have no reliable way of knowing whether a prospective tenant has always paid rent on time or properly maintained previous properties.

LocProof aims to bridge that gap by introducing **verified rental recommendations**.

Rather than replacing existing rental applications, LocProof complements them with something that paperwork cannot provide: **trust based on real rental experiences**.

---

## How it works

### For tenants

1. Sign in using an email verification link.
2. Request a recommendation from a previous landlord.
3. Provide rental information (address, rental period...).
4. The landlord receives a secure invitation.
5. Once validated, the recommendation becomes part of the tenant's profile.

### For landlords

1. Receive a secure email invitation.
2. Confirm the rental information.
3. Answer a short questionnaire.
4. Submit the recommendation.

No account creation is required.

---

## Privacy first

LocProof is intentionally designed to protect everyone's privacy.

Public profiles never expose sensitive information such as:

- landlord identities
- email addresses
- exact property addresses

Instead, visitors only see a synthesized view of verified recommendations and aggregated information.

---

## Project Status

LocProof is currently in the **validation phase**.

The MVP is functional and allows tenants to request verified recommendations from previous landlords.

The current objective is to validate the concept with real estate professionals and gather feedback before investing in more advanced features.

Current areas of work include:

- improving the existing user experience
- refining the recommendation workflow
- strengthening the project architecture and test coverage
- collecting feedback from real estate professionals
- validating product-market fit

---

## Architecture

LocProof follows a **Use Case Driven Architecture**.

Business logic is isolated into explicit use cases composed of strongly typed sequential steps.

Example:

```text
RequestReferenceUseCase

├── ValidateInput
├── FindTenant
├── FindLandlord
├── CreateReference
└── SendInvitationEmail
```

This architecture provides:

- clear business workflows
- strong separation of concerns
- highly testable code
- reusable domain services
- independent step testing

---

## Tech Stack

| Technology           | Purpose            |
| -------------------- | ------------------ |
| Next.js (App Router) | Frontend framework |
| TypeScript           | Type safety        |
| Tailwind CSS         | Styling            |
| shadcn/ui            | UI components      |
| Strapi               | Headless CMS & API |
| Resend               | Email delivery     |
| React Server Actions | Forms & mutations  |
| Vitest               | Unit testing       |

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/AntoineGuglielmi/locproof-front.git

cd locproof-front
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env.local
```

Update the values inside `.env.local`.

### Run the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Environment Variables

| Variable                   | Description                 |
| -------------------------- | --------------------------- |
| `STRAPI_API_BASE_URL`      | Strapi API URL              |
| `STRAPI_API_KEY`           | Strapi API key              |
| `RESEND_API_KEY`           | Resend API key              |
| `NEXT_PUBLIC_APP_URL`      | Frontend URL                |
| `NEXT_PUBLIC_LOCPROOF_DEV` | Development mode            |
| `BASIC_AUTH_USER`          | Optional basic auth         |
| `BASIC_AUTH_PASSWORD`      | Optional basic auth         |
| `REMOTE_PATTERN_PROTOCOL`  | Next.js image configuration |
| `REMOTE_PATTERN_HOSTNAME`  | Next.js image configuration |
| `REMOTE_PATTERN_PORT`      | Next.js image configuration |

---

## Testing

Business logic is designed around independently testable use cases.

Tests are written using **Vitest** and focus primarily on domain behaviour rather than UI rendering.

Run the test suite with:

```bash
npm run test
```

---

## Available Scripts

```bash
npm run dev      # Start development server

npm run build    # Production build

npm run start    # Start production server

npm run test     # Run tests

npm run lint     # Run ESLint

npm run types    # Generate Strapi TypeScript types
```

---

## What's next?

The current focus is not to add as many features as possible.

Instead, the priority is to confirm that the recommendation workflow solves a real problem for both tenants and landlords.

If the concept proves valuable, future developments may include:

- stronger landlord verification
- tools for real estate professionals
- fraud prevention mechanisms
- integrations with property management software

---

## About this repository

Although LocProof is currently in its validation phase, the project is developed with a strong focus on software quality.

The objective is to experiment with the product while building a maintainable and well-tested codebase that can evolve if the concept is validated.
