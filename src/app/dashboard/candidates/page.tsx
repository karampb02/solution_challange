"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { getCandidates, type Candidate } from "@/lib/api-client";

export default function CandidatesPage() {
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const response = await getCandidates(50, 0);
                if (!mounted) return;
                setCandidates(response.data);
                setSelectedId(response.data[0]?.id ?? null);
            } catch (error) {
                console.error("Candidates load error", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return candidates;
        return candidates.filter((candidate) => {
            return (
                candidate.name.toLowerCase().includes(term) ||
                candidate.title.toLowerCase().includes(term) ||
                candidate.skills.some((skill) => skill.toLowerCase().includes(term))
            );
        });
    }, [candidates, query]);

    const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Candidates</h1>
                <p className="mt-1 text-sm text-[#8b8ba3]">
                    Shortlisted profiles ranked by match and culture fit.
                </p>
            </header>

            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8ba3]" />
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name, title, or skill"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-white/30"
                />
            </div>

            <section className="grid gap-4 lg:grid-cols-5">
                <div className="space-y-2 lg:col-span-2">
                    {loading && <p className="text-sm text-[#8b8ba3]">Loading candidates...</p>}
                    {!loading && filtered.length === 0 && (
                        <p className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-[#8b8ba3]">
                            No candidates found.
                        </p>
                    )}
                    {filtered.map((candidate) => (
                        <button
                            key={candidate.id}
                            onClick={() => setSelectedId(candidate.id)}
                            className={`w-full rounded-xl border p-3 text-left transition ${selected?.id === candidate.id
                                    ? "border-[#4fb1ff]/40 bg-[#4fb1ff]/10"
                                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="truncate text-sm font-medium">{candidate.name}</p>
                                <p className="text-xs font-semibold text-[#7ce9b4]">{candidate.matchScore}%</p>
                            </div>
                            <p className="mt-1 truncate text-xs text-[#8b8ba3]">{candidate.title}</p>
                        </button>
                    ))}
                </div>

                <article className="glass-card lg:col-span-3 p-5">
                    {!selected && <p className="text-sm text-[#8b8ba3]">Select a candidate to view details.</p>}
                    {selected && (
                        <div className="space-y-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-xl font-semibold">{selected.name}</h2>
                                    <p className="text-sm text-[#8b8ba3]">{selected.title}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-right">
                                    <p className="text-[11px] uppercase tracking-wide text-[#8b8ba3]">Match</p>
                                    <p className="text-lg font-semibold text-[#7ce9b4]">{selected.matchScore}%</p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                                    <p className="mb-1 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Location</p>
                                    <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-[#8b8ba3]" />{selected.location}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                                    <p className="mb-1 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Experience</p>
                                    <p className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-[#8b8ba3]" />{selected.experience}</p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Highlights</p>
                                <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm leading-6 text-[#d6d6e8]">
                                    {selected.highlight}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-[11px] uppercase tracking-wide text-[#8b8ba3]">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {selected.skills.map((skill) => (
                                        <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[#d0d0e0]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </section>
        </div>
    );
}
