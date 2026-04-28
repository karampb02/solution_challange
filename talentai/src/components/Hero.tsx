"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  GitBranch,
  MessageSquare,
  Calendar,
  Zap,
  Brain,
} from "lucide-react";

const orbitNodes = [
  { icon: GitBranch, label: "GitHub", color: "#8b5cf6", delay: 0 },
  { icon: MessageSquare, label: "Slack", color: "#06b6d4", delay: 1.5 },
  { icon: Calendar, label: "Jira", color: "#10b981", delay: 3 },
  { icon: Zap, label: "Linear", color: "#f59e0b", delay: 4.5 },
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

        {/* Right - Orbit Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Orbit rings */}
            {[180, 260, 340].map((size, i) => (
              <div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Center brain */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.3)]">
              <Brain className="w-9 h-9 text-white" />
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

            {/* Floating particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "rgba(139,92,246,0.5)"
                      : "rgba(6,182,212,0.5)",
                  top: `${15 + Math.random() * 70}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
