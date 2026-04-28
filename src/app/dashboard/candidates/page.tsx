"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ArrowRight,
  MapPin,
  Briefcase,
  Star,
  GitBranch,
  Link2,
  UserPlus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { candidates } from "@/lib/mock-data";

const sourceIcons = {
  github: GitBranch,
  linkedin: Link2,
  referral: UserPlus,
};
const sourceColors = {
  github: "#8b5cf6",
  linkedin: "#0077b5",
  referral: "#10b981",
};

export default function CandidatesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCandidate = candidates.find((c) => c.id === selected);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Users className="w-7 h-7 text-cyan-400" />
          Matched Candidates
        </h1>
        <p className="text-sm text-[#55556a] mt-1">
          Candidates ranked by semantic match score against your active signals.
          Powered by Gemini embeddings + pgvector.
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55556a]" />
          <input
            type="text"
            placeholder="Search by skill, name, or experience..."
            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-violet-500/30 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-[#55556a] hover:text-[#8888a0] hover:border-white/[0.1] transition-all">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Candidate list */}
        <div className="lg:col-span-2 space-y-3">
          {candidates.map((candidate, i) => {
            const SourceIcon = sourceIcons[candidate.source];
            const isSelected = selected === candidate.id;
            return (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => setSelected(candidate.id)}
                role="button"
                tabIndex={0}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-violet-600/[0.08] border-violet-500/20"
                    : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"
                }`}
                style={{ color: "#f0f0f5" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-br from-violet-600 to-cyan-600 text-white"
                        : "bg-gradient-to-br from-violet-600/20 to-cyan-600/20 text-violet-300"
                    }`}
                  >
                    {candidate.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate" style={{ color: "#ffffff" }}>
                        {candidate.name}
                      </h3>
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center"
                        style={{ background: `${sourceColors[candidate.source]}15` }}
                      >
                        <SourceIcon
                          className="w-2.5 h-2.5"
                          style={{ color: sourceColors[candidate.source] }}
                        />
                      </div>
                    </div>
                    <p className="text-xs truncate" style={{ color: "#55556a" }}>
                      {candidate.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-semibold gradient-text">
                        {candidate.matchScore}% match
                      </span>
                      <span
                        className={`text-[10px] flex items-center gap-1 ${
                          candidate.availability === "available"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            candidate.availability === "available"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {candidate.availability === "available"
                          ? "Available"
                          : "Open"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass-card p-6 sticky top-8 self-start"
        >
          {selectedCandidate ? (
            <div className="space-y-6">
              {/* Profile header */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-lg font-bold text-white">
                  {selectedCandidate.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {selectedCandidate.name}
                  </h2>
                  <p className="text-sm text-[#8888a0]">
                    {selectedCandidate.title}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#55556a]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedCandidate.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {selectedCandidate.experience}
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                  Start Intro
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-xs text-[#55556a] mb-2">
                    Match Score
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold gradient-text">
                      {selectedCandidate.matchScore}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${selectedCandidate.matchScore}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-xs text-[#55556a] mb-2">
                    Culture Score
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-emerald-400">
                      {selectedCandidate.cultureScore}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${selectedCandidate.cultureScore}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div className="p-4 rounded-xl bg-violet-600/5 border border-violet-500/10">
                <div className="flex items-center gap-2 mb-2 text-xs text-violet-400">
                  <Star className="w-3.5 h-3.5" />
                  Gemini-Generated Highlight
                </div>
                <p className="text-sm text-[#8888a0] leading-relaxed">
                  {selectedCandidate.highlight}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs text-[#55556a] mb-3 uppercase tracking-wider">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-[#8888a0] border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className="w-12 h-12 text-[#55556a] mb-4" />
              <h3 className="text-base font-semibold text-[#8888a0] mb-2">
                Select a candidate
              </h3>
              <p className="text-xs text-[#55556a] max-w-xs">
                Click on a candidate from the list to see their detailed
                profile, match analysis, and Gemini-generated highlights.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
