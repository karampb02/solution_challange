# Backend Setup Guide

This document explains the backend infrastructure for TalentAI.

## Architecture Overview

The backend uses:
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database abstraction and migrations
- **PostgreSQL** - Primary database (via Supabase)
- **Google Gemini API** - AI-powered insights and interview question generation
- **pgvector** - Vector embeddings for semantic search

## Database Schema

### Models

1. **Candidate**
   - Basic information: name, title, location, experience
   - Scoring: matchScore, cultureScore
   - Skills array and highlights
   - Availability status and source (LinkedIn, GitHub, referral)
   - Vector embeddings for semantic search

2. **Signal**
   - Issue/task from external systems (Jira, GitHub, Slack, Linear)
   - Urgency levels and status tracking
   - Vector embeddings for intelligent matching
   - References to matched candidates via SignalMatch

3. **SignalMatch**
   - Junction table linking signals to candidates
   - Match score from vector similarity
   - Tracks which candidates matched which signals

4. **CultureDimension**
   - Team culture assessment metrics
   - Labels like "Collaboration", "Innovation", "Ownership"
   - Scores to track team alignment

5. **Activity**
   - Audit log of actions
   - Types: matching, interview_scheduled, signal_processed
   - Metadata for additional context

6. **InterviewPrep**
   - Scheduled interviews with generated content
   - AI-generated questions from Gemini
   - Insights about candidate-role fit

## Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname"

# Supabase (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# Google Gemini API
GOOGLE_AI_API_KEY="AIzaSy..."

# Application
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
npm install -D prisma @prisma/client @google/generative-ai
```

### 2. Setup Database

```bash
# Create database and tables
npx prisma migrate dev --name init

# (Optional) Seed with sample data
npx prisma db seed
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

## API Routes

### Candidates

- `GET /api/candidates` - List all candidates (paginated)
- `GET /api/candidates/[id]` - Get specific candidate with signal matches
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/[id]` - Update candidate
- `DELETE /api/candidates/[id]` - Delete candidate

### Signals

- `GET /api/signals` - List signals (with filtering by status/urgency)
- `POST /api/signals` - Create new signal
- Signals automatically include matched candidates

### Interviews

- `GET /api/interviews` - List scheduled interviews
- `POST /api/interviews` - Create interview prep
  - Auto-generates questions via Gemini
  - Auto-generates insights via Gemini

### Culture

- `GET /api/culture` - Get team culture dimensions
- `POST /api/culture` - Create/update culture dimension

### Activity

- `GET /api/activity` - Audit log of actions
- `POST /api/activity` - Log new activity

## Using the API Client

Import utilities from `@/lib/api-client.ts`:

```typescript
import {
  getCandidates,
  getSignals,
  getCultureDimensions,
  createInterview,
} from "@/lib/api-client";

// Fetch candidates
const { data: candidates } = await getCandidates(10, 0);

// Create interview (auto-generates questions)
const interview = await createInterview({
  candidateId: "c1",
  candidateName: "Sarah Chen",
  role: "Senior Backend Engineer",
  time: new Date(),
  matchedProject: "Event Streaming Migration",
});
```

## Vector Search (Future Enhancement)

The schema includes `embedding` fields using pgvector for:

1. **Semantic Candidate Matching** - Find candidates similar to job descriptions
2. **Signal-to-Candidate Matching** - Intelligently match issues to relevant experts
3. **Skill-Based Queries** - Find candidates with similar skill combinations

To enable vector search:

1. Enable pgvector extension in PostgreSQL:
   ```sql
   CREATE EXTENSION vector;
   ```

2. Generate embeddings using Gemini:
   ```typescript
   import { getEmbedding } from "@/lib/gemini";
   const embedding = await getEmbedding("Senior backend engineer");
   ```

3. Store and query embeddings via Prisma

## Gemini AI Integration

### Features

1. **Interview Question Generation**
   - Context-aware questions based on candidate background
   - Tailored to specific roles
   - Generated in `POST /api/interviews`

2. **Candidate Insights**
   - How candidate fits project needs
   - Potential contributions
   - Risk assessment

3. **Semantic Search**
   - Embed job descriptions and candidate profiles
   - Find best matches beyond keyword matching

### Configuration

- Uses `gemini-1.5-pro` model for insights
- Uses `embedding-001` for vector embeddings
- API key from `GOOGLE_AI_API_KEY`

## Development

### Run Development Server

```bash
npm run dev
```

### Access API Endpoints

```bash
curl http://localhost:3000/api/candidates
```

### Prisma Studio (Database Explorer)

```bash
npx prisma studio
```

### View Logs

Database query logs enabled in development mode. Check terminal output for SQL queries.

## Production Deployment

### Environment Variables

Set in your hosting platform (Vercel, Railway, etc.):

- `DATABASE_URL` - Connection string for production database
- `GOOGLE_AI_API_KEY` - Gemini API key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key (if using)

### Database Migrations

```bash
# Run migrations on production database
npx prisma migrate deploy
```

### Build

```bash
npm run build
```

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` format
- Check database server is running
- For Supabase: ensure IP whitelist includes your server

### Gemini API Errors

- Verify `GOOGLE_AI_API_KEY` is valid and has API enabled
- Check quota limits
- Review error logs in API responses

### Prisma Errors

- Run `npx prisma generate` after installing dependencies
- Clear `.next` folder and rebuild
- Check schema syntax with `npx prisma validate`

## Next Steps

1. Set up Supabase PostgreSQL database
2. Add Google Gemini API credentials
3. Run database migrations
4. (Optional) Seed database with sample data
5. Update React components to use API client instead of mock data
6. Deploy to production
