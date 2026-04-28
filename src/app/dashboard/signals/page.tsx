"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  GitPullRequest,
  MessageSquare,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { signals } from "@/lib/mock-data";

const signalIcons = {
  jira: Radar,
  github: GitPullRequest,
  slack: MessageSquare,
  linear: Zap,
};

const signalColors = {
  jira: "#10b981",
  github: "#8b5cf6",
  slack: "#06b6d4",
  linear: "#f59e0b",
};

const statusConfig = {
  new: {
    icon: AlertTriangle,
    label: "New",
    color: "#f59e0b",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  processing: {
    icon: Loader2,
    label: "Processing",
    color: "#06b6d4",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  matched: {
    icon: CheckCircle2,
    label: "Matched",
    color: "#10b981",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  acted: {
    icon: Sparkles,
    label: "Acted",
    color: "#8b5cf6",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
};

const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export default function SignalsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? signals
      : signals.filter((s) => s.type === filter);

  const sorted = [...filtered].sort(
    (a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Radar className="w-7 h-7 text-violet-400" />
          Signal Intelligence
        </h1>
        <p className="text-sm text-[#55556a] mt-1">
          Real-time signals captured from your integrations. TalentAI
          automatically detects hiring needs and skill gaps.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {[
          { key: "all", label: "All Signals", count: signals.length },
          { key: "jira", label: "Jira", count: signals.filter((s) => s.type === "jira").length },
          { key: "github", label: "GitHub", count: signals.filter((s) => s.type === "github").length },
          { key: "slack", label: "Slack", count: signals.filter((s) => s.type === "slack").length },
          { key: "linear", label: "Linear", count: signals.filter((s) => s.type === "linear").length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
              filter === f.key
                ? "bg-violet-600/15 text-violet-300 border-violet-500/30"
                : "bg-white/[0.02] text-[#55556a] border-white/[0.06] hover:text-[#8888a0] hover:border-white/[0.1]"
            }`}
          >
            {f.label}
            <span className="text-[10px] opacity-60">{f.count}</span>
          </button>
        ))}
      </motion.div>

      {/* Signal List */}
      <div className="space-y-3">
        {sorted.map((signal, i) => {
          const Icon = signalIcons[signal.type];
          const color = signalColors[signal.type];
          const status = statusConfig[signal.status];
          const StatusIcon = status.icon;
          const isExpanded = expanded === signal.id;

          return (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : signal.id)}
                className="w-full p-5 flex items-start gap-4 text-left"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold">{signal.title}</h3>
                    <span
                      className={`badge text-[10px] py-0 px-2 ${status.bg} ${status.border} border`}
                      style={{ color: status.color }}
                    >
                      <StatusIcon
                        className={`w-3 h-3 ${
                          signal.status === "processing" ? "animate-spin" : ""
                        }`}
                      />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#55556a]">
                    <span>{signal.timestamp}</span>
                    <span className="font-mono">{signal.source}</span>
                    {signal.matchCount && (
                      <span className="text-violet-400 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {signal.matchCount} candidates
                      </span>
                    )}
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#55556a] shrink-0 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 ml-14">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <p className="text-sm text-[#8888a0] leading-relaxed mb-4">
                          <Sparkles className="w-4 h-4 text-violet-400 inline mr-2" />
                          <span className="text-xs text-[#55556a]">
                            Gemini Analysis:
                          </span>
                          <br />
                          {signal.description}
                        </p>
                        {signal.matchCount && signal.matchCount > 0 && (
                          <button className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors">
                            View {signal.matchCount} matched candidates
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
