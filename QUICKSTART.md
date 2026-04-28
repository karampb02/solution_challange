# Quick Start - Backend Setup

## 1. Install Dependencies (3 minutes)

```bash
npm install
```

This installs:
- Prisma ORM for database management
- Google Generative AI for Gemini integration
- All other required packages

## 2. Configure Environment (2 minutes)

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Edit `.env.local` with:

### Option A: Supabase (Recommended)
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string to `DATABASE_URL`
4. Copy your project URL to `NEXT_PUBLIC_SUPABASE_URL`

### Option B: Local PostgreSQL
1. Start your PostgreSQL server
2. Create a database: `createdb talentai`
3. Set `DATABASE_URL="postgresql://localhost/talentai"`

### Option C: Docker PostgreSQL
```bash
docker run --name talentai-db -e POSTGRES_DB=talentai -p 5432:5432 -d postgres
# DATABASE_URL=postgresql://postgres@localhost/talentai
```

### Add Google Gemini API Key
1. Go to https://ai.google.dev
2. Create API key
3. Add to `NEXT_PUBLIC_API_URL` in `.env.local`

## 3. Setup Database (2 minutes)

```bash
# Create tables
npm run db:migrate

# (Optional) Add sample data
npm run db:seed
```

## 4. Start Development (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Update React Components

Components need to use the new API client instead of mock-data:

**Before:**
```typescript
import { candidates } from "@/lib/mock-data";
```

**After:**
```typescript
import { getCandidates } from "@/lib/api-client";

const { data: candidates } = await getCandidates();
```

Components that need updates:
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/candidates/page.tsx`
- `src/app/dashboard/signals/page.tsx`
- `src/app/dashboard/interviews/page.tsx`
- `src/app/dashboard/culture/page.tsx`
- `src/app/dashboard/activity/page.tsx`

## Useful Commands

```bash
# View database in browser
npm run db:studio

# Run migrations on production
npm run db:push

# Re-seed database
npm run db:seed
```

## API Test

Quick API test after setup:

```bash
# List candidates
curl http://localhost:3000/api/candidates

# List signals
curl http://localhost:3000/api/signals

# List culture dimensions
curl http://localhost:3000/api/culture
```

## Troubleshooting

### npm install fails
```bash
npm install --legacy-peer-deps
```

### Database connection error
- Check DATABASE_URL format in .env.local
- Ensure database server is running
- Verify credentials are correct

### Prisma errors
```bash
npx prisma validate      # Check schema
npx prisma generate      # Regenerate client
```

### Components still crash
- All imports from `@/lib/mock-data` removed but files need updating
- Check files listed in step 5 above
- Make sure using async/await for API calls

## What's Ready

✅ Database schema (Prisma)
✅ API routes (Next.js)
✅ Gemini integration
✅ Sample data seeding
✅ API client utilities
✅ Database migrations

## What's Next

⏳ Update React components to use API
⏳ Deploy database to production
⏳ Add vector embeddings for semantic search
⏳ Add authentication/authorization
⏳ Add error boundaries and loading states

## Need Help?

1. Check `BACKEND_SETUP.md` for detailed docs
2. Check `IMPLEMENTATION_SUMMARY.md` for what was added
3. All API routes have error handling and logging
4. Prisma Studio shows database: `npm run db:studio`

**Happy coding!** 🚀
