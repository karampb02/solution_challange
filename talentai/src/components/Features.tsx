"use client";

import { motion } from "framer-motion";
import {
  GitPullRequest,
  MessageSquareText,
  Radar,
  CalendarClock,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: "invisible-requisition",
    badge: "Feature 01",
    badgeColor: "badge-violet",
    icon: Radar,
    iconBg: "from-violet-600/20 to-violet-500/5",
    iconColor: "#a78bfa",
    title: "The Invisible Requisition",
    subtitle: "Jira · Linear · GitHub Telemetry",
    description:
      "TalentAI monitors your Jira epics, Linear projects, and GitHub repos in real-time. When it detects a new architecture shift or skill gap, it automatically synthesizes a 'Hidden Context Brief' and finds matching engineers — before you write a single job description.",
    highlights: [
      "Webhook-driven context extraction",
      "Gemini-powered skill gap analysis",
      "Proactive Slack notifications",
    ],
    demo: {
      type: "slack" as const,
      message:
        'Noticed you\'re spinning up the Kafka migration (Epic-847). I found 3 engineers who have executed this exact migration pattern in production. Want me to start intros?',
      from: "TalentAI",
      channel: "#engineering-leads",
    },
  },
  {
    id: "pr-blocker",
    badge: "Feature 02",
    badgeColor: "badge-cyan",
    icon: GitPullRequest,
    iconBg: "from-cyan-600/20 to-cyan-500/5",
    iconColor: "#22d3ee",
    title: "PR-Blocker → Candidate",
    subtitle: "GitHub App · Code Intelligence",
    description:
      "When a PR stalls due to a complex technical challenge, TalentAI analyzes the diff and discussion to identify the exact bottleneck. It then surfaces freelance experts who have solved this specific problem before — directly in the PR thread.",
    highlights: [
      "Real-time PR stall detection",
      "Code diff semantic analysis",
      "One-click expert deployment",
    ],
    demo: {
      type: "github" as const,
      message:
        "Detected a bottleneck with WebGL memory management in this PR. Found 2 freelance experts available this week who have solved this in Next.js. Click below to deploy an intro.",
      from: "talentai-bot",
      channel: "PR #482",
    },
  },
  {
    id: "culture-vector",
    badge: "Feature 03",
    badgeColor: "badge-emerald",
    icon: MessageSquareText,
    iconBg: "from-emerald-600/20 to-emerald-500/5",
    iconColor: "#34d399",
    title: "Ambient Culture Vectoring",
    subtitle: "Slack · Teams · Communication DNA",
    description:
      "With consent, TalentAI analyzes your team's communication patterns — debate style, async preferences, documentation habits — to build a unique 'Culture Vector'. Candidates are then ranked by natural cultural alignment, not generic buzzwords.",
    highlights: [
      "Communication pattern analysis",
      "Work style vectorization",
      "Automatic culture-fit scoring",
    ],
    demo: {
      type: "vector" as const,
      message: "",
      from: "",
      channel: "",
    },
  },
  {
    id: "zero-prep",
    badge: "Feature 04",
    badgeColor: "badge-amber",
    icon: CalendarClock,
    iconBg: "from-amber-600/20 to-amber-500/5",
    iconColor: "#fbbf24",
    title: "Zero-Prep Context Injector",
    subtitle: "Calendar API · Interview Intelligence",
    description:
      "15 minutes before every interview, the interviewer receives a hyper-personalized 'Cheat Sheet' with targeted questions based on the candidate's exact experience matched against the company's specific technical needs. Zero prep, world-class interviews.",
    highlights: [
      "Auto-generated interview guides",
      "Candidate-project cross-analysis",
      "Pre-meeting Slack delivery",
    ],
    demo: {
      type: "cheatsheet" as const,
      message:
        "You're interviewing Sarah Chen in 15 min. She built a custom WebRTC signaling server in her OSS project — exactly what we need for Epic-402. Here are 3 targeted questions.",
      from: "TalentAI",
      channel: "DM",
    },
  },
];

function SlackDemo({ demo }: { demo: typeof features[0]["demo"] }) {
  return (
    <div className="bg-[#0a0a14] rounded-xl p-4 border border-white/[0.04]">
      <div className="flex items-center gap-2 mb-3 text-xs text-[#55556a]">
        <span className="text-[#8888a0] font-medium">{demo.channel}</span>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs font-bold text-white">T</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-white">{demo.from}</span>
            <span className="text-[10px] text-[#55556a]">2:34 PM</span>
          </div>
          <p className="text-sm text-[#8888a0] leading-relaxed">{demo.message}</p>
          <div className="flex gap-2 mt-3">
            <button className="text-xs px-3 py-1.5 rounded-md bg-violet-600/20 text-violet-300 border border-violet-500/20 hover:bg-violet-600/30 transition-colors">
              Yes, show candidates →
            </button>
            <button className="text-xs px-3 py-1.5 rounded-md bg-white/[0.04] text-[#55556a] border border-white/[0.06] hover:text-[#8888a0] transition-colors">
              Snooze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GitHubDemo({ demo }: { demo: typeof features[0]["demo"] }) {
  return (
    <div className="bg-[#0a0a14] rounded-xl p-4 border border-white/[0.04]">
      <div className="flex items-center gap-2 mb-3">
        <GitPullRequest className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-[#8888a0] font-medium">{demo.channel}</span>
        <span className="badge badge-rose text-[10px] py-0.5 px-2">stalled 3d</span>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-[#161620] flex items-center justify-center shrink-0">
          <span className="text-xs font-mono text-cyan-400">🤖</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-white">{demo.from}</span>
            <span className="badge badge-cyan text-[10px] py-0 px-1.5">bot</span>
          </div>
          <p className="text-sm text-[#8888a0] leading-relaxed">{demo.message}</p>
          <div className="mt-3 flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/20">
              Deploy Expert →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VectorDemo() {
  const vectors = [
    { label: "Async-First", company: 87, candidate: 92, color: "#8b5cf6" },
    { label: "Code Reviews", company: 78, candidate: 81, color: "#06b6d4" },
    { label: "Documentation", company: 91, candidate: 85, color: "#10b981" },
    { label: "Debate Culture", company: 65, candidate: 70, color: "#f59e0b" },
    { label: "Ship Speed", company: 83, candidate: 88, color: "#f43f5e" },
  ];
  return (
    <div className="bg-[#0a0a14] rounded-xl p-4 border border-white/[0.04]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-[#55556a]">Culture Match: Team ↔ Sarah Chen</span>
        <span className="badge badge-emerald text-[10px]">96% aligned</span>
      </div>
      <div className="space-y-3">
        {vectors.map((v) => (
          <div key={v.label}>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-[#8888a0]">{v.label}</span>
              <span className="text-[#55556a]">
                {v.company}% / {v.candidate}%
              </span>
            </div>
            <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${v.company}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute h-full rounded-full opacity-40"
                style={{ background: v.color }}
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${v.candidate}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute h-full rounded-full"
                style={{ background: v.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheatsheetDemo({ demo }: { demo: typeof features[0]["demo"] }) {
  return (
    <div className="bg-[#0a0a14] rounded-xl p-4 border border-white/[0.04]">
      <div className="flex items-center gap-2 mb-3">
        <CalendarClock className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-[#8888a0]">15 min before interview</span>
      </div>
      <div className="bg-[#0e0e18] rounded-lg p-3 border border-amber-500/10 mb-3">
        <p className="text-sm text-amber-200/80 leading-relaxed">{demo.message}</p>
      </div>
      <div className="space-y-2">
        {[
          "How did you handle NAT traversal in your signaling server?",
          "Walk me through your approach to TURN fallback.",
          "How would you scale this to 10k concurrent rooms?",
        ].map((q, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-xs text-[#8888a0]"
          >
            <span className="text-amber-500 font-mono shrink-0">Q{i + 1}.</span>
            <span>{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="badge badge-violet mb-4 inline-flex">
            Antigravity Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            The best interface is{" "}
            <span className="gradient-text">no interface</span>
          </h2>
          <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
            Four autonomous features that extract context from where your team
            already works — eliminating 100% of the friction.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="space-y-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card gradient-border p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Text */}
                <div className="space-y-5">
                  <span className={`badge ${feature.badgeColor}`}>
                    {feature.badge}
                  </span>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center`}
                    >
                      <feature.icon
                        className="w-5 h-5"
                        style={{ color: feature.iconColor }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-xs text-[#55556a]">{feature.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-[#8888a0]"
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ background: feature.iconColor }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Demo */}
                <div>
                  {feature.demo.type === "slack" && (
                    <SlackDemo demo={feature.demo} />
                  )}
                  {feature.demo.type === "github" && (
                    <GitHubDemo demo={feature.demo} />
                  )}
                  {feature.demo.type === "vector" && <VectorDemo />}
                  {feature.demo.type === "cheatsheet" && (
                    <CheatsheetDemo demo={feature.demo} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
