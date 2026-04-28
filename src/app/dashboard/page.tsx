"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radar,
  Users,
  GitPullRequest,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Brain,
} from "lucide-react";
import { signals, candidates, activityFeed } from "@/lib/mock-data";

const stats = [
  {
    label: "Active Signals",
    value: "12",
    change: "+3 today",
    icon: Radar,
    color: "#8b5cf6",
    trend: "up",
  },
  {
    label: "Candidates Matched",
    value: "47",
    change: "+8 this week",
    icon: Users,
    color: "#06b6d4",
    trend: "up",
  },
  {
    label: "Avg. Match Score",
    value: "94%",
    change: "+2.1% vs last month",
    icon: TrendingUp,
    color: "#10b981",
    trend: "up",
  },
  {
    label: "Time to First Match",
    value: "1.8m",
    change: "Down from 3.2m",
    icon: Clock,
    color: "#f59e0b",
    trend: "down",
  },
];

const urgencyColors = {
  low: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  high: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  critical: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

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

const activityIcons = {
  signal: Radar,
  match: Users,
  culture: MessageSquare,
  prep: Clock,
  action: CheckCircle2,
};
const activityColors = {
  signal: "#8b5cf6",
  match: "#06b6d4",
  culture: "#10b981",
  prep: "#f59e0b",
  action: "#f43f5e",
};

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Brain className="w-7 h-7 text-violet-400" />
            Dashboard
          </h1>
          <p className="text-sm text-[#55556a] mt-1">
            TalentAI is monitoring 4 integrations. Last scan: 2 min ago.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span
                className="text-xs flex items-center gap-1"
                style={{ color: stat.color }}
              >
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-[#55556a]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Radar className="w-5 h-5 text-violet-400" />
              <h2 className="text-base font-semibold">Live Signals</h2>
              <span className="badge badge-violet text-[10px]">
                {signals.length} active
              </span>
            </div>
            <Link
              href="/dashboard/signals"
              className="text-xs text-[#55556a] hover:text-[#8888a0] flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {signals.slice(0, 4).map((signal, i) => {
              const Icon = signalIcons[signal.type];
              const color = signalColors[signal.type];
              const urgency = urgencyColors[signal.urgency];
              return (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.03] transition-all cursor-pointer group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium truncate">
                        {signal.title}
                      </h3>
                      <span
                        className={`badge text-[10px] py-0 px-1.5 ${urgency.bg} ${urgency.text} ${urgency.border} border`}
                      >
                        {signal.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-[#55556a] line-clamp-1">
                      {signal.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-[#55556a]">
                        {signal.timestamp}
                      </span>
                      <span className="text-[10px] text-[#55556a] font-mono">
                        {signal.source}
                      </span>
                      {signal.matchCount && (
                        <span className="text-[10px] text-violet-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {signal.matchCount} matched
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#55556a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold">Activity</h2>
          </div>

          <div className="space-y-4">
            {activityFeed.map((item, i) => {
              const Icon = activityIcons[item.type];
              const color = activityColors[item.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="flex gap-3"
                >
                  <div className="relative">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    {i < activityFeed.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-px w-px h-4 bg-white/[0.04]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{item.event}</p>
                    <p className="text-[10px] text-[#55556a] truncate">
                      {item.detail}
                    </p>
                    <p className="text-[10px] text-[#55556a] mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Candidates Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold">Top Matched Candidates</h2>
            <span className="badge badge-cyan text-[10px]">
              For: Kafka Migration
            </span>
          </div>
          <Link
            href="/dashboard/candidates"
            className="text-xs text-[#55556a] hover:text-[#8888a0] flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.slice(0, 3).map((candidate, i) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-sm font-semibold text-violet-300 shrink-0">
                  {candidate.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{candidate.name}</h3>
                  <p className="text-xs text-[#55556a]">{candidate.title}</p>
                </div>
                <div className="ml-auto text-right shrink-0">
                  <div className="text-lg font-bold gradient-text">
                    {candidate.matchScore}%
                  </div>
                  <div className="text-[10px] text-[#55556a]">match</div>
                </div>
              </div>

              <p className="text-xs text-[#8888a0] line-clamp-2 mb-3">
                {candidate.highlight}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-[#8888a0] border border-white/[0.06]"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 4 && (
                  <span className="text-[10px] text-[#55556a]">
                    +{candidate.skills.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                <span
                  className={`text-[10px] flex items-center gap-1 ${
                    candidate.availability === "available"
                      ? "text-emerald-400"
                      : candidate.availability === "open"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      candidate.availability === "available"
                        ? "bg-emerald-500"
                        : candidate.availability === "open"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  />
                  {candidate.availability === "available"
                    ? "Available now"
                    : candidate.availability === "open"
                    ? "Open to opportunities"
                    : "Currently busy"}
                </span>
                <button className="text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start intro <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
