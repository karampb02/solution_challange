"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  Info,
  Shield,
  TrendingUp,
} from "lucide-react";
import { cultureDimensions } from "@/lib/mock-data";

const dimensionColors = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#3b82f6",
];

export default function CulturePage() {
  const avgScore = Math.round(
    cultureDimensions.reduce((sum, d) => sum + d.teamScore, 0) /
      cultureDimensions.length
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MessageSquareText className="w-7 h-7 text-emerald-400" />
          Culture Vector
        </h1>
        <p className="text-sm text-[#55556a] mt-1">
          Your team&apos;s communication DNA, extracted from Slack and
          GitHub interactions. Candidates are matched against this
          multidimensional culture profile.
        </p>
      </motion.div>

      {/* Privacy notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
      >
        <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-emerald-300 font-medium">
            Privacy-First Analysis
          </p>
          <p className="text-xs text-[#8888a0] mt-1">
            Only aggregate patterns are analyzed — no individual messages are
            stored or surfaced. All analysis is consent-based and compliant
            with your data policies.
          </p>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card p-8 text-center"
      >
        <p className="text-xs text-[#55556a] uppercase tracking-wider mb-3">
          Overall Culture Profile Strength
        </p>
        <div className="text-6xl font-bold gradient-text mb-2">{avgScore}%</div>
        <p className="text-sm text-[#8888a0]">
          Based on analysis of 12,847 messages across 23 public channels over
          the past 90 days
        </p>
      </motion.div>

      {/* Dimensions Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {cultureDimensions.map((dim, i) => (
          <motion.div
            key={dim.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">{dim.label}</h3>
                <p className="text-xs text-[#55556a]">{dim.description}</p>
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: dimensionColors[i] }}
              >
                {dim.teamScore}
              </span>
            </div>

            {/* Bar */}
            <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${dim.teamScore}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${dimensionColors[i]}80, ${dimensionColors[i]})`,
                }}
              />
            </div>

            {/* Interpretation */}
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp
                className="w-3 h-3"
                style={{ color: dimensionColors[i] }}
              />
              <span className="text-[10px] text-[#55556a]">
                {dim.teamScore >= 85
                  ? "Strong signal — high confidence"
                  : dim.teamScore >= 70
                  ? "Moderate signal — good confidence"
                  : "Emerging pattern — growing confidence"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar Chart Placeholder - using a creative visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8"
      >
        <h3 className="text-base font-semibold mb-6 text-center">
          Culture Vector Visualization
        </h3>
        <div className="flex justify-center">
          <div className="relative w-72 h-72">
            {/* Rings */}
            {[1, 0.75, 0.5, 0.25].map((scale) => (
              <div
                key={scale}
                className="absolute inset-0 border border-white/[0.04] rounded-full"
                style={{
                  transform: `scale(${scale})`,
                }}
              />
            ))}

            {/* Data points */}
            {cultureDimensions.map((dim, i) => {
              const angle = (i * 360) / cultureDimensions.length - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = (dim.teamScore / 100) * 130;
              const x = 144 + radius * Math.cos(rad);
              const y = 144 + radius * Math.sin(rad);

              return (
                <motion.div
                  key={dim.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                  className="absolute"
                  style={{
                    left: x - 6,
                    top: y - 6,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: dimensionColors[i],
                      boxShadow: `0 0 12px ${dimensionColors[i]}60`,
                    }}
                  />
                  <span
                    className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-[#55556a] whitespace-nowrap font-medium"
                    style={{ color: dimensionColors[i] }}
                  >
                    {dim.label.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-[#55556a]">Team DNA</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
