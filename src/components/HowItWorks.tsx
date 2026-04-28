"use client";

import { motion } from "framer-motion";
import {
  Webhook,
  Brain,
  Database,
  Search,
  Send,
} from "lucide-react";

const steps = [
  {
    icon: Webhook,
    color: "#8b5cf6",
    title: "Ambient Signal Capture",
    description:
      "Node.js webhooks listen to Jira, GitHub, Slack, and Linear for new epics, stalled PRs, and communication patterns.",
    tech: "Node.js Webhooks",
  },
  {
    icon: Brain,
    color: "#06b6d4",
    title: "Gemini Deep Analysis",
    description:
      "The Gemini API extracts project context, skill requirements, cultural signals, and urgency from the raw signals.",
    tech: "Gemini API",
  },
  {
    icon: Database,
    color: "#10b981",
    title: "Semantic Vectorization",
    description:
      "Extracted context is embedded and stored in Supabase pgvector for ultra-fast semantic similarity matching.",
    tech: "Supabase pgvector",
  },
  {
    icon: Search,
    color: "#f59e0b",
    title: "Talent Matching",
    description:
      "Vector similarity search matches project needs against candidate profiles, weighted by skill, culture, and availability.",
    tech: "Semantic Search",
  },
  {
    icon: Send,
    color: "#f43f5e",
    title: "Proactive Delivery",
    description:
      "Results are pushed to the right person at the right time via Slack DMs, PR comments, or the TalentAI dashboard.",
    tech: "Next.js + Slack API",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 radial-glow">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="badge badge-cyan mb-4 inline-flex">Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
            A five-stage pipeline that turns ambient workplace signals into
            precision talent matches.
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/20 via-cyan-500/20 to-emerald-500/20 md:-translate-x-px" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div
                    className={`glass-card p-6 inline-block ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        i % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: `${step.color}18` }}
                      >
                        <step.icon
                          className="w-4.5 h-4.5"
                          style={{ color: step.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{step.title}</h3>
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: step.color }}
                        >
                          {step.tech}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#8888a0] leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot with step number */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-7">
                  <div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: step.color,
                      background: `${step.color}15`,
                      boxShadow: `0 0 16px ${step.color}30`,
                    }}
                  >
                    <span
                      className="text-[9px] font-bold"
                      style={{ color: step.color }}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
