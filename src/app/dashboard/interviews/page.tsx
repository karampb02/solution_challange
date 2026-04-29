"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, MessageSquare, Sparkles } from "lucide-react";
import {
    getCandidates,
    getInterviews,
    type Candidate,
    type InterviewPrep,
} from "@/lib/api-client";

export default function InterviewsPage() {
    const [loading, setLoading] = useState(true);
    const [interviews, setInterviews] = useState<InterviewPrep[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const [interviewsRes, candidatesRes] = await Promise.all([
                    getInterviews(20, 0),
                    getCandidates(50, 0),
                ]);

                if (!mounted) return;
                setInterviews(interviewsRes.data);
                setCandidates(candidatesRes.data);
            } catch (error) {
                console.error("Interviews load error", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    const nextInterview = useMemo(() => {
        return [...interviews].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())[0];
    }, [interviews]);

    const selectedCandidate = candidates.find((c) => c.id === nextInterview?.candidateId);

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Interview Prep</h1>
                <p className="mt-1 text-sm text-[#8b8ba3]">
                    Clean, focused prep cards with role context and AI-generated prompts.
                </p>
            </header>

            {loading && <p className="text-sm text-[#8b8ba3]">Loading interview plans...</p>}

            {!loading && !nextInterview && (
                <article className="glass-card p-5 text-sm text-[#8b8ba3]">No interviews scheduled yet.</article>
            )}

            {nextInterview && (
                <section className="grid gap-4 lg:grid-cols-5">
                    <article className="glass-card p-5 lg:col-span-3">
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#8b8ba3]">Next Interview</p>
                                <h2 className="mt-1 text-xl font-semibold">{nextInterview.candidateName}</h2>
                                <p className="text-sm text-[#8b8ba3]">{nextInterview.role}</p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-[#8b8ba3]">
                                <CalendarClock className="h-3 w-3" />
                                {new Date(nextInterview.time).toLocaleString()}
                            </span>
                        </div>

                        <div>
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Suggested Questions</p>
                            <div className="space-y-2">
                                {nextInterview.questions.map((question, index) => (
                                    <div key={question} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-[#d5d5e6]">
                                        <span className="mr-2 text-xs text-[#8b8ba3]">Q{index + 1}.</span>
                                        {question}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    <aside className="space-y-4 lg:col-span-2">
                        <article className="glass-card p-5">
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Matched Project</p>
                            <p className="text-sm font-medium">{nextInterview.matchedProject}</p>
                        </article>

                        <article className="glass-card p-5">
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">AI Insights</p>
                            <div className="space-y-2">
                                {nextInterview.insights.map((insight) => (
                                    <p key={insight} className="text-sm text-[#d5d5e6]">
                                        <Sparkles className="mr-2 inline h-3.5 w-3.5 text-[#82cfff]" />
                                        {insight}
                                    </p>
                                ))}
                            </div>
                        </article>

                        <article className="glass-card p-5">
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Candidate Context</p>
                            {!selectedCandidate && <p className="text-sm text-[#8b8ba3]">Candidate metadata unavailable.</p>}
                            {selectedCandidate && (
                                <div className="space-y-1.5 text-sm text-[#d5d5e6]">
                                    <p>{selectedCandidate.title}</p>
                                    <p className="text-[#8b8ba3]">{selectedCandidate.location}</p>
                                    <p className="text-[#8b8ba3]">{selectedCandidate.experience} experience</p>
                                    <p className="pt-1 text-[#7ce9b4]">Match score: {selectedCandidate.matchScore}%</p>
                                </div>
                            )}
                        </article>

                        <article className="glass-card p-5 text-sm text-[#8b8ba3]">
                            <MessageSquare className="mb-2 h-4 w-4 text-[#82cfff]" />
                            Interview notes can be sent to Slack after the meeting.
                        </article>
                    </aside>
                </section>
            )}
        </div>
    );
}
