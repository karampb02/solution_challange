"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { getCultureDimensions, type CultureDimension } from "@/lib/api-client";

export default function CulturePage() {
    const [loading, setLoading] = useState(true);
    const [dimensions, setDimensions] = useState<CultureDimension[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const response = await getCultureDimensions();
                if (mounted) setDimensions(response.data);
            } catch (error) {
                console.error("Culture load error", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    const average = useMemo(() => {
        if (!dimensions.length) return 0;
        return Math.round(
            dimensions.reduce((sum, item) => sum + item.teamScore, 0) / dimensions.length
        );
    }, [dimensions]);

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Culture Fit</h1>
                <p className="mt-1 text-sm text-[#8b8ba3]">
                    Team profile based on communication and collaboration signals.
                </p>
            </header>

            <article className="glass-card p-6">
                <p className="text-xs uppercase tracking-wide text-[#8b8ba3]">Average Team Score</p>
                <p className="mt-2 text-5xl font-semibold text-[#82cfff]">{average}%</p>
            </article>

            <section className="space-y-3">
                {loading && <p className="text-sm text-[#8b8ba3]">Loading culture dimensions...</p>}
                {!loading && dimensions.length === 0 && (
                    <p className="text-sm text-[#8b8ba3]">No culture dimensions available yet.</p>
                )}

                {dimensions.map((dimension) => (
                    <article key={dimension.id} className="glass-card p-4">
                        <div className="mb-2 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-sm font-semibold">{dimension.label}</h2>
                                <p className="text-xs text-[#8b8ba3]">{dimension.description}</p>
                            </div>
                            <span className="text-lg font-semibold text-[#7ce9b4]">{dimension.teamScore}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#4fb1ff] to-[#7ce9b4]"
                                style={{ width: `${Math.min(100, Math.max(0, dimension.teamScore))}%` }}
                            />
                        </div>
                    </article>
                ))}
            </section>

            <article className="glass-card p-4 text-sm text-[#8b8ba3]">
                <MessageSquareText className="mr-2 inline h-4 w-4 text-[#82cfff]" />
                Privacy-first: only aggregate patterns are used.
            </article>
        </div>
    );
}
