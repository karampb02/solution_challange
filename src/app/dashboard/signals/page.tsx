"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { getSignals, type Signal } from "@/lib/api-client";

export default function SignalsPage() {
    const [loading, setLoading] = useState(true);
    const [signals, setSignals] = useState<Signal[]>([]);
    const [filter, setFilter] = useState<"all" | "high" | "critical">("all");

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const response = await getSignals(50, 0);
                if (mounted) setSignals(response.data);
            } catch (error) {
                console.error("Signals load error", error);
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
        if (filter === "all") return signals;
        return signals.filter((signal) => signal.urgency === filter);
    }, [signals, filter]);

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Signals</h1>
                <p className="mt-1 text-sm text-[#8b8ba3]">Live demand signals from your integrations.</p>
            </header>

            <div className="flex gap-2">
                {["all", "high", "critical"].map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item as "all" | "high" | "critical")}
                        className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition ${filter === item ? "border-[#4fb1ff]/40 bg-[#4fb1ff]/10" : "border-white/10 bg-white/[0.02]"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <section className="space-y-2">
                {loading && <p className="text-sm text-[#8b8ba3]">Loading signals...</p>}
                {!loading && filtered.length === 0 && <p className="text-sm text-[#8b8ba3]">No signals found.</p>}

                {filtered.map((signal) => {
                    const highPriority = signal.urgency === "high" || signal.urgency === "critical";

                    return (
                        <article key={signal.id} className="glass-card p-4">
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-sm font-semibold">{signal.title}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase text-[#9a9ab2]">
                                        {signal.status}
                                    </span>
                                    <span
                                        className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${highPriority ? "border-[#ff9266]/40 text-[#ffb18e]" : "border-white/10 text-[#9a9ab2]"
                                            }`}
                                    >
                                        {signal.urgency}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-[#cfcfe0]">{signal.description}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#8b8ba3]">
                                <span>{new Date(signal.timestamp).toLocaleString()}</span>
                                <span>{signal.source}</span>
                                {signal.status === "processing" && (
                                    <span className="inline-flex items-center gap-1 text-[#82cfff]"><Loader2 className="h-3 w-3 animate-spin" />processing</span>
                                )}
                                {signal.status === "matched" && (
                                    <span className="inline-flex items-center gap-1 text-[#7ce9b4]"><CheckCircle2 className="h-3 w-3" />matched</span>
                                )}
                                {signal.status === "new" && (
                                    <span className="inline-flex items-center gap-1 text-[#ffb18e]"><AlertTriangle className="h-3 w-3" />new</span>
                                )}
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    );
}
