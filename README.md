# Resonance v1

Resonance is a multi-tenant text-to-speech platform for generating high-quality speech and managing reusable voices.
It supports built-in system voices, custom voice creation (upload or record), and generation history with audio stored in Cloudflare R2.

## What this project does

- Lets users and orgs create and manage voices.
- Generates speech from text using the Chatterbox API.
- Stores voice and generation audio in Cloudflare R2.
- Keeps generation metadata in Postgres via Prisma.
- Uses Clerk for authentication and org context.

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- tRPC + TanStack Query
- Prisma + PostgreSQL
- Clerk auth
- Cloudflare R2 (S3-compatible object storage)
- Sentry

## Current billing mode

Billing/subscription enforcement is currently disabled in the app flow.
Polar variables are still defined in the environment schema, so either:

- set the Polar variables in your .env file, or
- set SKIP_ENV_VALIDATION=true for local development.

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn/bun)
- PostgreSQL database
- Clerk app credentials
- Cloudflare R2 bucket + credentials
- Running Chatterbox API endpoint

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

If you do not have a .env.example yet, create .env manually using the variable list below.

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. (Optional, recommended) Seed system voices:

```bash
npx prisma db seed
```

5. Start the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Environment variables

Defined by src/lib/env.ts and related scripts.

### Required by the web app

```env
# Core
DATABASE_URL=
APP_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

# Chatterbox API
CHATTERBOX_API_URL=
CHATTERBOX_API_KEY=

# Polar (kept in schema; can be placeholders if billing is disabled)
POLAR_ACCESS_TOKEN=
POLAR_SERVER=sandbox
POLAR_PRODUCT_ID=
POLAR_METER_VOICE_CREATION=voice_creation
POLAR_METER_TTS_GENERATION=tts_generation
POLAR_METER_TTS_PROPERTY=characters

# Optional local convenience
SKIP_ENV_VALIDATION=false
```

### Optional tooling/runtime

```env
# Sentry upload/build
SENTRY_AUTH_TOKEN=

# Optional, used by external model/runtime flows
HF_ACCESS_TOKEN=
```

## Available scripts

- npm run dev: start local development server
- npm run build: production build
- npm run start: run production server
- npm run lint: lint project
- npm run sync-api: regenerate Chatterbox OpenAPI types into src/types/chatterbox-api.d.ts

## How to use

1. Sign in and select or create an organization.
2. Open Voices and create a custom voice by uploading or recording an audio sample.
3. Open Text-to-Speech, choose a voice, tune generation settings, and generate audio.
4. View generated history and play back audio.

## Project structure

```text
.
├── prisma/
│   ├── schema.prisma                # DB models and enums
│   └── migrations/                  # Prisma migrations
├── scripts/
│   ├── seed-system-voices.ts        # Seeds built-in system voices + uploads audio to R2
│   └── sync-api.ts                  # Pulls OpenAPI and generates chatterbox-api.d.ts
├── src/
│   ├── app/                         # Next.js routes, layouts, API handlers
│   │   ├── api/
│   │   │   ├── audio/               # Audio streaming endpoints
│   │   │   ├── voices/              # Voice CRUD/create endpoints
│   │   │   └── trpc/                # tRPC handler
│   │   └── (dashboard)/             # Main app pages
│   ├── features/
│   │   ├── voices/                  # Voice management UI + logic
│   │   ├── text-to-speech/          # TTS form + generation UI
│   │   ├── billing/                 # Billing UI/hooks (currently bypassed)
│   │   └── dashboard/               # Dashboard feature modules
│   ├── trpc/
│   │   ├── routers/                 # API routers (voices, generations, billing, etc.)
│   │   └── server.tsx/client.tsx    # tRPC server/client wiring
│   ├── lib/
│   │   ├── env.ts                   # Runtime env validation
│   │   ├── db.ts                    # Prisma client
│   │   ├── r2.ts                    # R2 upload/signed-url helpers
│   │   └── chatterbox-client.ts     # Client for TTS backend
│   └── generated/prisma/            # Generated Prisma client output
├── chatterbox_tts.py                # Modal/FastAPI deployment for TTS backend
└── README.md
```

## Database and seeding notes

- Prisma config: prisma.config.ts
- Schema: prisma/schema.prisma
- Seed command: tsx scripts/seed-system-voices.ts
- Seed expects audio files under scripts/system-voices

## API type sync

When your Chatterbox backend OpenAPI changes, run:

```bash
npm run sync-api
```

This updates src/types/chatterbox-api.d.ts from CHATTERBOX_API_URL/openapi.json.

## Deployment notes

- Provide all required environment variables in your host.
- Run migrations before serving traffic.
- Ensure R2 bucket credentials and CORS/access settings are correct.
- Configure Clerk redirect URLs for your production domain.

## Troubleshooting

- Env validation errors on boot:
	- verify values in .env, or use SKIP_ENV_VALIDATION=true locally.
- Voice creation fails:
	- check file size (< 20 MB), content type, and minimum duration requirements.
- TTS generation fails:
	- verify CHATTERBOX_API_URL and CHATTERBOX_API_KEY.
- Missing audio playback:
	- verify R2 object keys, bucket permissions, and signed URL logic.
