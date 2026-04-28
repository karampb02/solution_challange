"use client";

import { motion } from "framer-motion";

const companies = [
  "Vercel",
  "Stripe",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
  "Planetscale",
  "Railway",
  "Resend",
  "Clerk",
  "Neon",
  "Turso",
];

export default function TrustedBy() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="gradient-line max-w-2xl mx-auto mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-sm text-[#55556a] uppercase tracking-widest font-medium">
          Trusted by <span className="text-[#8888a0]">200+</span> engineering
          teams worldwide
        </p>
      </motion.div>

      {/* Scrolling logo ticker */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#06060a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#06060a] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee items-center gap-16 shrink-0 pr-16">
            {[...companies, ...companies].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#55556a]">
                    {name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#55556a] whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gradient-line max-w-2xl mx-auto mt-12" />
    </section>
  );
}
