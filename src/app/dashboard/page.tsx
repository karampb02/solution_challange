"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Radar, Users, Activity, Clock } from "lucide-react";
import {
    getActivities,
    getCandidates,
    getSignals,
    type Activity as ActivityItem,
    type Candidate,
    type Signal,
} from "@/lib/api-client";

function formatRelativeTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
}

export default function DashboardOverview() {
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [signals, setSignals] = useState<Signal[]>([]);
    const [activities, setActivities] = useState<ActivityItem[]>([]);

    useEffect(() => {
        let mounted = true;

        async function loadData() {
            try {
                const [candidateRes, signalRes, activityRes] = await Promise.all([
                    getCandidates(6, 0),
                    getSignals(6, 0),
                    getActivities(8, 0),
                ]);

                if (!mounted) return;
                setCandidates(candidateRes.data);
                setSignals(signalRes.data);
                setActivities(activityRes.data);
            } catch (error) {
                console.error("Dashboard load error", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadData();
        return () => {
            mounted = false;
        };
    }, []);

    const stats = useMemo(() => {
        const avgMatch =
            candidates.length > 0
                ? Math.round(
                    candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length
                )
                : 0;

        const highUrgency = signals.filter((s) => ["high", "critical"].includes(s.urgency)).length;

        return [
            { label: "Active Signals", value: signals.length, icon: Radar },
            { label: "Candidates", value: candidates.length, icon: Users },
            { label: "Avg Match", value: `${avgMatch}%`, icon: Activity },
            { label: "High Priority", value: highUrgency, icon: Clock },
        ];
    }, [candidates, signals]);

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-sm text-[#8b8ba3]">
                        Live overview of signals, candidate fit, and recent activity.
                    </p>
                </div>
            </div>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <article key={item.label} className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-wide text-[#7b7b94]">{item.label}</p>
                            <item.icon className="h-4 w-4 text-[#65b7ff]" />
                        </div>
                        <p className="mt-3 text-2xl font-semibold">{item.value}</p>
                    </article>
                ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-5">
                <article className="glass-card p-5 lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold tracking-wide text-[#d8d8e8]">Latest Signals</h2>
                        <Link href="/dashboard/signals" className="text-xs text-[#8b8ba3] hover:text-white">
                            Open all
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {loading && <p className="text-sm text-[#8b8ba3]">Loading signals...</p>}
                        {!loading && signals.length === 0 && (
                            <p className="text-sm text-[#8b8ba3]">No signals yet.</p>
                        )}
                        {signals.slice(0, 5).map((signal) => (
                            <div key={signal.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="truncate text-sm font-medium">{signal.title}</p>
                                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase text-[#9a9ab2]">
                                        {signal.urgency}
                                    </span>
                                </div>
                                <p className="mt-1 line-clamp-1 text-xs text-[#8b8ba3]">{signal.description}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="glass-card p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold tracking-wide text-[#d8d8e8]">Top Candidates</h2>
                        <Link href="/dashboard/candidates" className="text-xs text-[#8b8ba3] hover:text-white">
                            View list
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {loading && <p className="text-sm text-[#8b8ba3]">Loading candidates...</p>}
                        {!loading && candidates.length === 0 && (
                            <p className="text-sm text-[#8b8ba3]">No candidates yet.</p>
                        )}
                        {candidates.slice(0, 4).map((candidate) => (
                            <div key={candidate.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div>
                                    <p className="text-sm font-medium">{candidate.name}</p>
                                    <p className="text-xs text-[#8b8ba3]">{candidate.title}</p>
                                </div>
                                <p className="text-sm font-semibold text-[#80d8c2]">{candidate.matchScore}%</p>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <article className="glass-card p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold tracking-wide text-[#d8d8e8]">Recent Activity</h2>
                    <Link href="/dashboard/activity" className="inline-flex items-center gap-1 text-xs text-[#8b8ba3] hover:text-white">
                        Full timeline <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <div className="space-y-2">
                    {loading && <p className="text-sm text-[#8b8ba3]">Loading activity...</p>}
                    {!loading && activities.length === 0 && (
                        <p className="text-sm text-[#8b8ba3]">No activity yet.</p>
                    )}
                    {activities.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
                            <div>
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-xs text-[#8b8ba3]">{item.description}</p>
                            </div>
                            <span className="text-[11px] text-[#787890]">{formatRelativeTime(item.timestamp)}</span>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}
