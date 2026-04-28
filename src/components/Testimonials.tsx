"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Park",
    role: "VP Engineering, ScaleOps",
    avatar: "DP",
    color: "#8b5cf6",
    rating: 5,
    quote:
      "TalentAI found us a Kafka expert in under 2 minutes — someone we'd been searching for manually for 3 weeks. The culture-fit scoring was shockingly accurate.",
  },
  {
    name: "Amara Okafor",
    role: "CTO, Finova",
    avatar: "AO",
    color: "#06b6d4",
    rating: 5,
    quote:
      "We eliminated our entire job-description workflow. TalentAI monitors our Linear projects and proactively surfaces candidates before we even open a req.",
  },
  {
    name: "Lena Müller",
    role: "Head of People, Synthwave",
    avatar: "LM",
    color: "#10b981",
    rating: 5,
    quote:
      "The interview prep cheat sheets alone saved our engineering managers 8+ hours a week. It's like having a world-class recruiter embedded in Slack.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-amber mb-4 inline-flex">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Loved by{" "}
            <span className="gradient-text">engineering leaders</span>
          </h2>
          <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
            Teams using TalentAI report 10x faster hiring cycles and
            dramatically better candidate-team fit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card card-glow p-7 flex flex-col relative overflow-hidden group"
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                style={{ background: `${testimonial.color}08` }}
              />

              {/* Quote icon */}
              <Quote
                className="w-8 h-8 mb-4 opacity-20"
                style={{ color: testimonial.color }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm text-[#8888a0] leading-relaxed flex-1 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}80, ${testimonial.color}40)`,
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-[#55556a]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
