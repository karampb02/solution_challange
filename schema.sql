-- Create tables from Prisma schema
-- Run this in Supabase SQL editor

CREATE TABLE public."Candidate" (
    id text NOT NULL PRIMARY KEY,
    name text NOT NULL,
    avatar text NOT NULL,
    title text NOT NULL,
    location text NOT NULL,
    "matchScore" integer NOT NULL,
    "cultureScore" integer NOT NULL,
    skills text[] NOT NULL,
    highlight text NOT NULL,
    availability text NOT NULL,
    source text NOT NULL,
    experience text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL
);

CREATE TABLE public."Signal" (
    id text NOT NULL PRIMARY KEY,
    type text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "timestamp" timestamp(3) NOT NULL,
    urgency text NOT NULL,
    status text NOT NULL,
    "matchCount" integer NOT NULL DEFAULT 0,
    source text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL
);

CREATE TABLE public."SignalMatch" (
    id text NOT NULL PRIMARY KEY,
    "signalId" text NOT NULL,
    "candidateId" text NOT NULL,
    "matchScore" double precision NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SignalMatch_signalId_candidateId_key" UNIQUE ("signalId", "candidateId"),
    CONSTRAINT "SignalMatch_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES public."Signal"(id) ON DELETE CASCADE,
    CONSTRAINT "SignalMatch_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES public."Candidate"(id) ON DELETE CASCADE
);

CREATE TABLE public."CultureDimension" (
    id text NOT NULL PRIMARY KEY,
    label text NOT NULL UNIQUE,
    "teamScore" integer NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL
);

CREATE TABLE public."Activity" (
    id text NOT NULL PRIMARY KEY,
    type text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "timestamp" timestamp(3) NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public."InterviewPrep" (
    id text NOT NULL PRIMARY KEY,
    "candidateId" text NOT NULL,
    "candidateName" text NOT NULL,
    role text NOT NULL,
    "time" timestamp(3) NOT NULL,
    "matchedProject" text NOT NULL,
    questions text[] NOT NULL,
    insights text[] NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL
);

-- Create indexes
CREATE INDEX "Candidate_matchScore_idx" ON public."Candidate"("matchScore");
CREATE INDEX "Candidate_cultureScore_idx" ON public."Candidate"("cultureScore");
CREATE INDEX "Signal_status_idx" ON public."Signal"(status);
CREATE INDEX "Signal_urgency_idx" ON public."Signal"(urgency);
CREATE INDEX "SignalMatch_matchScore_idx" ON public."SignalMatch"("matchScore");
CREATE INDEX "Activity_timestamp_idx" ON public."Activity"("timestamp");
