"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Seeded pseudo-random function for consistent values across server/client
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
import {
  ArrowRight,
  Sparkles,
  GitBranch,
  MessageSquare,
  Calendar,
  Zap,
  Brain,
  Radar,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const orbitNodes = [
  { icon: GitBranch, label: "GitHub", color: "#8b5cf6", delay: 0 },
  { icon: MessageSquare, label: "Slack", color: "#06b6d4", delay: 1.5 },
  { icon: Calendar, label: "Jira", color: "#10b981", delay: 3 },
  { icon: Zap, label: "Linear", color: "#f59e0b", delay: 4.5 },
];

const floatingCards = [
  {
    icon: Users,
    label: "3 Matched",
    value: "97%",
    color: "#8b5cf6",
    x: -40,
    y: -30,
    delay: 1.2,
  },
  {
    icon: TrendingUp,
    label: "Culture Fit",
    value: "96%",
    color: "#10b981",
    x: 260,
    y: 50,
    delay: 1.8,
  },
  {
    icon: CheckCircle2,
    label: "Auto-Matched",
    value: "< 2min",
    color: "#06b6d4",
    x: 20,
    y: 300,
    delay: 2.2,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/8 via-cyan-500/5 to-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060a] to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left - Copy */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="badge badge-violet">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Gemini AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Hire the right
            <br />
            talent with{" "}
            <span className="gradient-text">zero</span>
            <br />
            effort.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-[#8888a0] max-w-lg leading-relaxed"
          >
            TalentAI monitors your repos, tickets, and conversations to
            anticipate hiring needs{" "}
            <span className="text-white font-medium">
              before you even know you have them
            </span>
            . No job descriptions. No uploads. No friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2.5 text-sm font-medium px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-500"
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-full border border-white/10 text-[#8888a0] hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Explore Features
            </a>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-10 pt-4"
          >
            {[
              { value: "0", label: "Manual uploads", suffix: "" },
              { value: "94", label: "Match accuracy", suffix: "%" },
              { value: "< 2", label: "Min to first match", suffix: "min" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold">
                  {stat.value}
                  <span className="gradient-text text-lg ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs text-[#55556a] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - Dashboard Mockup + Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Outer glow ring */}
            <div className="absolute inset-[-20px] rounded-full border border-violet-500/[0.06]" />
            <div className="absolute inset-[-50px] rounded-full border border-cyan-500/[0.04]" />

            {/* Orbit rings */}
            {[180, 260, 340].map((size) => (
              <div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Center - Dashboard Preview Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl bg-[#0a0a14] border border-white/[0.06] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.15)]">
              {/* Mini dashboard header */}
              <div className="h-7 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 flex items-center px-3 gap-1.5 border-b border-white/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                <span className="text-[7px] text-[#55556a] ml-auto font-mono">
                  talentai
                </span>
              </div>
              {/* Mini dashboard content */}
              <div className="p-2.5 space-y-2">
                {/* Mini stat row */}
                <div className="flex gap-1.5">
                  {[
                    { v: "12", c: "#8b5cf6" },
                    { v: "47", c: "#06b6d4" },
                    { v: "94%", c: "#10b981" },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="flex-1 rounded-md p-1.5"
                      style={{ background: `${s.c}10` }}
                    >
                      <div
                        className="text-[9px] font-bold"
                        style={{ color: s.c }}
                      >
                        {s.v}
                      </div>
                      <div className="w-full h-[2px] rounded-full mt-1" style={{ background: `${s.c}30` }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "70%" }}
                          transition={{ duration: 2, delay: 1.5 }}
                          className="h-full rounded-full"
                          style={{ background: s.c }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini signal rows */}
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <div
                      className="w-4 h-4 rounded shrink-0"
                      style={{
                        background: [
                          "#8b5cf620",
                          "#06b6d420",
                          "#10b98120",
                          "#f59e0b20",
                        ][i - 1],
                      }}
                    />
                    <div className="flex-1 space-y-0.5">
                      <div
                        className="h-[3px] rounded-full"
                        style={{
                          width: `${60 + seededRandom(i * 1000) * 30}%`,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />
                      <div
                        className="h-[2px] rounded-full"
                        style={{
                          width: `${40 + seededRandom(i * 2000) * 20}%`,
                          background: "rgba(255,255,255,0.03)",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Orbiting integration nodes */}
            {orbitNodes.map((node, i) => (
              <motion.div
                key={node.label}
                className="absolute top-1/2 left-1/2"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: node.delay,
                }}
                style={{
                  width: 0,
                  height: 0,
                }}
              >
                <div
                  className="flex flex-col items-center gap-1"
                  style={{
                    transform: `translateX(${90 + i * 40}px) translateY(-20px)`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: node.delay,
                    }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${node.color}18`,
                      border: `1px solid ${node.color}30`,
                    }}
                  >
                    <node.icon className="w-5 h-5" style={{ color: node.color }} />
                  </motion.div>
                  <motion.span
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: node.delay,
                    }}
                    className="text-[10px] text-[#55556a] font-medium"
                  >
                    {node.label}
                  </motion.span>
                </div>
              </motion.div>
            ))}

            {/* Floating stat cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay, duration: 0.5 }}
                className="absolute z-20"
                style={{ left: card.x, top: card.y }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay * 0.5 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0c0c16]/90 backdrop-blur-md border border-white/[0.06] shadow-lg"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}18` }}
                  >
                    <card.icon className="w-3 h-3" style={{ color: card.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#55556a]">{card.label}</div>
                    <div
                      className="text-xs font-bold"
                      style={{ color: card.color }}
                    >
                      {card.value}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "rgba(139,92,246,0.5)"
                      : "rgba(6,182,212,0.5)",
                  top: `${15 + ((i * 13) % 70)}%`,
                  left: `${15 + ((i * 17) % 70)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}

            {/* Pulsing connection lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
                </linearGradient>
              </defs>
              {[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = Math.round((210 + 160 * Math.cos(rad)) * 1000) / 1000;
                const y2 = Math.round((210 + 160 * Math.sin(rad)) * 1000) / 1000;
                return (
                  <motion.line
                    key={angle}
                    x1="210"
                    y1="210"
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGrad)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: angle / 360,
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
