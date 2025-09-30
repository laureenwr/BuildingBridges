# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

<details>
  <summary>Why did I make this?</summary>
  
  In 2020, I made a course called "React 2025" which showed how to build a SaaS application with Next.js, Stripe, and other tools.

Well, it's almost 2025 and React 19 has brought so many amazing new features I didn't predict! This repo is a demonstration of the latest React and Next.js patterns. These patterns can drastically simplify some common tasks in building your SaaS, like building forms, talking to your database, and more.

For example, React now has built in hooks like `useActionState` to handle inline form errors and pending states. React Server Actions can replace a lot of boilerplate code needed to call an API Route from the client-side. And finally, the React `use` hook combined with Next.js makes it incredibly easy to build a powerful `useUser()` hook.

We're able to fetch the user from our Postgres database in the root layout, but _not_ await the `Promise`. Instead, we forward the `Promise` to a React context provider, where we can "unwrap" it and awaited the streamed in data. This means we can have the best of both worlds: easy code to fetch data from our database (e.g. `getUser()`) and a React hook we can use in Client Components (e.g. `useUser()`).

Fun fact: the majority of the UI for this application was built with [v0](https://v0.dev) 🤯 [More details here](https://x.com/leeerob/status/1835777934361084316) if you want to learn about this repo.

</details>

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
git clone https://github.com/leerob/next-saas-starter
cd next-saas-starter
pnpm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `POSTGRES_URL`: Set this to your production database URL.
5. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev

# Building Bridges Website

## Environment Setup

This project uses environment variables for configuration. We provide a setup script to help you get started.

### Initial Setup

1. Run the environment setup script:
   ```bash
   ./scripts/setup-env.sh
   ```
   This will create:
   - `.env.development` for local development
   - `.env.test` for testing
   - `.env.production.template` as a template for production settings

2. Review and update the created files with your specific configuration:
   - Database credentials
   - Authentication settings
   - API keys
   - Feature flags

### Environment Files

- `.env.development`: Used for local development
- `.env.test`: Used for running tests
- `.env.production`: Used in production (create from `.env.production.template`)
- `.env.*.template`: Template files that can be committed to version control

⚠️ Important Notes:
- Never commit actual environment files (`.env.*`) to version control
- Keep sensitive information secure
- Regularly update secrets and API keys
- Back up your production environment configuration securely

### Manual Configuration

If you prefer to set up environment variables manually:

1. Copy the appropriate template file:
   ```bash
   cp .env.production.template .env.development
   ```

2. Update the values in your new environment file:
   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_generated_secret
   # ... other variables
   ```

3. Ensure all required variables are set before running the application

### Email (Password Reset)

Enable outgoing emails for password resets using either Resend or SMTP.

Resend:

```env

EMAIL_FROM=Building Bridges <no-reply@your-domain>
SITE_URL=https://your-deployment-url
```

SMTP:

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
EMAIL_FROM=Building Bridges <no-reply@your-domain>
SITE_URL=https://your-deployment-url
```

Notes:
- `SITE_URL` ensures reset links are absolute (falls back to `VERCEL_URL` or `http://localhost:3000`).
- If neither Resend nor SMTP is configured, the reset page displays the link so you can copy it manually.
