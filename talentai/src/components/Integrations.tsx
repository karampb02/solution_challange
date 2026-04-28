"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  MessageSquare,
  ClipboardList,
  Calendar,
  Database,
  Code2,
} from "lucide-react";

const integrations = [
  { icon: GitBranch, name: "GitHub", desc: "Repos, PRs, Issues", color: "#8b5cf6" },
  { icon: MessageSquare, name: "Slack", desc: "Channels, DMs", color: "#06b6d4" },
  { icon: ClipboardList, name: "Jira", desc: "Epics, Sprints", color: "#10b981" },
  { icon: Code2, name: "Linear", desc: "Issues, Projects", color: "#f59e0b" },
  { icon: Calendar, name: "Google Cal", desc: "Meetings, Events", color: "#f43f5e" },
  { icon: Database, name: "Supabase", desc: "Vector DB", color: "#3b82f6" },
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-emerald mb-4 inline-flex">
            Integrations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Lives where your{" "}
            <span className="gradient-text">team works</span>
          </h2>
          <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
            Plug in once, then forget about it. TalentAI hooks into the tools
            your team already uses every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card gradient-border p-6 text-center group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${integration.color}15` }}
              >
                <integration.icon
                  className="w-6 h-6"
                  style={{ color: integration.color }}
                />
              </div>
              <h4 className="text-sm font-semibold mb-1">{integration.name}</h4>
              <p className="text-xs text-[#55556a]">{integration.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
