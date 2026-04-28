"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Sparkles,
  Star,
  MessageSquare,
  Code2,
  BookOpen,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { interviewPrep, candidates } from "@/lib/mock-data";

export default function InterviewsPage() {
  const candidate = candidates[0]; // Sarah Chen

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <CalendarClock className="w-7 h-7 text-amber-400" />
          Interview Prep
        </h1>
        <p className="text-sm text-[#55556a] mt-1">
          Auto-generated interview cheat sheets, delivered 15 minutes before
          each meeting. Zero prep required.
        </p>
      </motion.div>

      {/* Upcoming interview banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card gradient-border p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 shimmer" />
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-lg font-bold text-white shrink-0">
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">
                  {interviewPrep.candidateName}
                </h2>
                <span className="badge badge-amber text-[10px]">
                  <Clock className="w-3 h-3" />
                  Upcoming
                </span>
              </div>
              <p className="text-sm text-[#8888a0]">{interviewPrep.role}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[#55556a]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {interviewPrep.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#55556a] mb-1">Matched to</div>
            <span className="badge badge-violet">
              <Code2 className="w-3 h-3" />
              {interviewPrep.matchedProject}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h3 className="text-base font-semibold">
              AI-Generated Questions
            </h3>
            <span className="text-[10px] text-[#55556a]">
              Personalized to candidate&apos;s exact experience
            </span>
          </div>

          <div className="space-y-4">
            {interviewPrep.questions.map((question, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono font-bold text-violet-400">
                    Q{i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {question}
                  </p>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      See related work
                    </button>
                    <span className="text-[10px] text-[#55556a]">•</span>
                    <button className="text-[10px] text-[#55556a] hover:text-[#8888a0] flex items-center gap-1">
                      Regenerate
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Key Insights */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-semibold">Key Insights</h3>
            </div>
            <div className="space-y-3">
              {interviewPrep.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex gap-3 text-xs text-[#8888a0]"
                >
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{insight}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Match Score",
                  value: `${candidate.matchScore}%`,
                  color: "#8b5cf6",
                },
                {
                  label: "Culture Fit",
                  value: `${candidate.cultureScore}%`,
                  color: "#10b981",
                },
                {
                  label: "Experience",
                  value: candidate.experience,
                  color: "#06b6d4",
                },
                {
                  label: "Availability",
                  value: "Immediate",
                  color: "#f59e0b",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs text-[#55556a]">{stat.label}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="glass-card p-6 text-center">
            <MessageSquare className="w-8 h-8 text-[#55556a] mx-auto mb-3" />
            <p className="text-xs text-[#55556a] mb-4">
              This cheat sheet was auto-delivered to your Slack DM at 2:45 PM
            </p>
            <button className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 mx-auto">
              <ExternalLink className="w-3 h-3" />
              Open in Slack
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
