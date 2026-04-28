"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Radar,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { activityFeed } from "@/lib/mock-data";

const iconMap = {
  signal: Radar,
  match: Users,
  culture: MessageSquare,
  prep: Clock,
  action: CheckCircle2,
};
const colorMap = {
  signal: "#8b5cf6",
  match: "#06b6d4",
  culture: "#10b981",
  prep: "#f59e0b",
  action: "#f43f5e",
};

// Extended activity for this page
const extendedActivity = [
  ...activityFeed,
  {
    time: "2 days ago",
    event: "Integration connected",
    detail: "GitHub App installed on org/frontend",
    type: "action" as const,
  },
  {
    time: "3 days ago",
    event: "Culture scan started",
    detail: "Analyzing 23 Slack channels (consent granted)",
    type: "culture" as const,
  },
  {
    time: "4 days ago",
    event: "New signal detected",
    detail: "Linear project ANALYTICS-Q2 created",
    type: "signal" as const,
  },
  {
    time: "5 days ago",
    event: "Candidates matched",
    detail: "4 engineers for ClickHouse analytics role",
    type: "match" as const,
  },
  {
    time: "1 week ago",
    event: "Platform setup complete",
    detail: "All integrations configured and monitoring active",
    type: "action" as const,
  },
];

export default function ActivityPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Activity className="w-7 h-7 text-cyan-400" />
          Activity Feed
        </h1>
        <p className="text-sm text-[#55556a] mt-1">
          Everything TalentAI has done for your team — every signal detected,
          every match made, every insight generated.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Actions this week", value: "23", color: "#8b5cf6" },
          { label: "Hours saved", value: "47", color: "#06b6d4" },
          { label: "Auto-matches", value: "12", color: "#10b981" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-[#55556a]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/20 via-cyan-500/20 to-transparent" />

        <div className="space-y-1">
          {extendedActivity.map((item, i) => {
            const Icon = iconMap[item.type];
            const color = colorMap[item.type];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                className="relative flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors group"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                  style={{ background: `${color}12` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-medium">{item.event}</h3>
                    {i === 0 && (
                      <span className="badge badge-violet text-[10px] py-0 px-1.5">
                        new
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#55556a]">{item.detail}</p>
                </div>

                {/* Time */}
                <span className="text-[10px] text-[#55556a] shrink-0 pt-1.5">
                  {item.time}
                </span>

                {/* Hover action */}
                <ArrowRight className="w-4 h-4 text-[#55556a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1.5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
