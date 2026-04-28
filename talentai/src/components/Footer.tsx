"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card gradient-border p-10 md:p-16 text-center mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 shimmer" />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to remove <span className="gradient-text">all friction</span>?
            </h2>
            <p className="text-[#8888a0] max-w-lg mx-auto mb-8">
              Stop writing job descriptions. Stop uploading briefs. Let TalentAI
              handle everything while you focus on building.
            </p>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2.5 text-sm font-medium px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-[0_0_50px_rgba(139,92,246,0.35)] transition-all duration-500"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">
              Talent<span className="gradient-text">AI</span>
            </span>
          </div>
          <p className="text-xs text-[#55556a]">
            © 2026 TalentAI. Built with Next.js, Gemini, and Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
