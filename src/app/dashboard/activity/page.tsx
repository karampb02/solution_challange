"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowRight } from "lucide-react";
import { getActivities, type Activity as ActivityItem } from "@/lib/api-client";

function formatTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
}

export default function ActivityPage() {
    const [loading, setLoading] = useState(true);
    const [activity, setActivity] = useState<ActivityItem[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const response = await getActivities(50, 0);
                if (mounted) setActivity(response.data);
            } catch (error) {
                console.error("Activity load error", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Activity</h1>
                <p className="mt-1 text-sm text-[#8b8ba3]">A clean timeline of system actions and updates.</p>
            </header>

            <section className="space-y-2">
                {loading && <p className="text-sm text-[#8b8ba3]">Loading activity...</p>}
                {!loading && activity.length === 0 && (
                    <p className="text-sm text-[#8b8ba3]">No activity yet.</p>
                )}

                {activity.map((item) => (
                    <article key={item.id} className="glass-card p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
                                <Activity className="h-4 w-4 text-[#82cfff]" />
                                {item.title}
                            </h2>
                            <span className="text-[11px] text-[#8b8ba3]">{formatTime(item.timestamp)}</span>
                        </div>
                        <p className="mt-1 text-sm text-[#d1d1e3]">{item.description}</p>
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#8b8ba3]">
                            {item.type}
                            <ArrowRight className="h-3 w-3" />
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}
