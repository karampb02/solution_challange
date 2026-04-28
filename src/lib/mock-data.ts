// Mock data for the TalentAI dashboard

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  matchScore: number;
  cultureScore: number;
  skills: string[];
  highlight: string;
  availability: "available" | "open" | "busy";
  source: "github" | "linkedin" | "referral";
  experience: string;
}

export interface Signal {
  id: string;
  type: "jira" | "github" | "slack" | "linear";
  title: string;
  description: string;
  timestamp: string;
  urgency: "low" | "medium" | "high" | "critical";
  status: "new" | "processing" | "matched" | "acted";
  matchCount?: number;
  source: string;
}

export interface CultureDimension {
  label: string;
  teamScore: number;
  description: string;
}

export interface InterviewPrep {
  candidateName: string;
  role: string;
  time: string;
  matchedProject: string;
  questions: string[];
  insights: string[];
}

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Sarah Chen",
    avatar: "SC",
    title: "Senior Systems Engineer",
    location: "San Francisco, CA",
    matchScore: 97,
    cultureScore: 96,
    skills: ["Kafka", "Go", "Kubernetes", "gRPC", "PostgreSQL"],
    highlight:
      "Led a monolith-to-microservices migration at Scale AI, transitioning 14 services to event-driven Kafka architecture. Reduced latency by 73%.",
    availability: "available",
    source: "github",
    experience: "8 years",
  },
  {
    id: "c2",
    name: "Marcus Rivera",
    avatar: "MR",
    title: "Platform Engineer",
    location: "Austin, TX",
    matchScore: 94,
    cultureScore: 91,
    skills: ["Kafka", "Rust", "Terraform", "AWS", "Docker"],
    highlight:
      "Built real-time data pipelines processing 2M events/sec at Stripe. Designed the CDC system using Kafka Connect + Debezium.",
    availability: "open",
    source: "linkedin",
    experience: "6 years",
  },
  {
    id: "c3",
    name: "Priya Patel",
    avatar: "PP",
    title: "Staff Backend Engineer",
    location: "London, UK",
    matchScore: 91,
    cultureScore: 93,
    skills: ["Kafka", "Java", "Spring Boot", "Redis", "Elasticsearch"],
    highlight:
      "Architected event sourcing platform at Deliveroo handling 500K orders/day. Published 3 talks on distributed systems at KubeCon.",
    availability: "available",
    source: "referral",
    experience: "10 years",
  },
  {
    id: "c4",
    name: "Jordan Kim",
    avatar: "JK",
    title: "Backend Engineer",
    location: "Seoul, KR (Remote)",
    matchScore: 88,
    cultureScore: 89,
    skills: ["Kafka", "Python", "FastAPI", "ClickHouse", "Kubernetes"],
    highlight:
      "Built Kafka Streams analytics pipeline at Coupang processing real-time inventory across 30M SKUs.",
    availability: "available",
    source: "github",
    experience: "5 years",
  },
  {
    id: "c5",
    name: "Elena Volkov",
    avatar: "EV",
    title: "Distributed Systems Engineer",
    location: "Berlin, DE",
    matchScore: 86,
    cultureScore: 94,
    skills: ["Kafka", "Scala", "Akka", "PostgreSQL", "Prometheus"],
    highlight:
      "Core contributor to Apache Kafka. Implemented KIP-500 (KRaft consensus) in the open-source project. Deep expertise in exactly-once semantics.",
    availability: "open",
    source: "github",
    experience: "9 years",
  },
];

export const signals: Signal[] = [
  {
    id: "s1",
    type: "jira",
    title: "Epic: Migrate monolith to Kafka microservices",
    description:
      "New epic created in PLATFORM project. Detected architecture shift requiring Kafka, gRPC, and distributed systems expertise. Estimated 3-month effort with skill gap identified.",
    timestamp: "12 min ago",
    urgency: "high",
    status: "matched",
    matchCount: 5,
    source: "PLATFORM-847",
  },
  {
    id: "s2",
    type: "github",
    title: "PR #482 stalled: WebGL memory leak in renderer",
    description:
      "PR has 47 comments over 8 days with no resolution. Core issue: texture atlas memory management causing OOM crashes on mobile Safari. Team lacks WebGL depth.",
    timestamp: "3 hours ago",
    urgency: "critical",
    status: "matched",
    matchCount: 2,
    source: "frontend/renderer",
  },
  {
    id: "s3",
    type: "slack",
    title: "Team discussion: Need ML pipeline expertise",
    description:
      'Detected recurring theme in #ml-team channel: "We don\'t have anyone who can optimize the training pipeline." Mentioned 7 times in past 2 weeks by 4 different engineers.',
    timestamp: "1 day ago",
    urgency: "medium",
    status: "processing",
    source: "#ml-team",
  },
  {
    id: "s4",
    type: "linear",
    title: "Project: Real-time analytics dashboard",
    description:
      "New Linear project created with 23 issues. Stack requires ClickHouse, WebSocket streaming, and D3.js visualization. No current team members have ClickHouse experience.",
    timestamp: "2 days ago",
    urgency: "medium",
    status: "matched",
    matchCount: 4,
    source: "ANALYTICS-Q2",
  },
  {
    id: "s5",
    type: "github",
    title: "Issue #891: Implement E2E encryption",
    description:
      "Security-critical issue opened by CTO. Requires Signal Protocol implementation with forward secrecy. Highly specialized cryptography expertise needed.",
    timestamp: "4 days ago",
    urgency: "high",
    status: "new",
    source: "core/security",
  },
];

export const cultureDimensions: CultureDimension[] = [
  {
    label: "Async-First Communication",
    teamScore: 87,
    description: "Team strongly prefers written async communication over meetings",
  },
  {
    label: "Code Review Depth",
    teamScore: 78,
    description: "Moderate-depth reviews focusing on architecture over style",
  },
  {
    label: "Documentation Culture",
    teamScore: 91,
    description: "Heavy documentation with RFC process for major changes",
  },
  {
    label: "Constructive Debate",
    teamScore: 65,
    description: "Open to technical disagreement, prefers data-driven arguments",
  },
  {
    label: "Ship Velocity",
    teamScore: 83,
    description: "Fast iteration with weekly releases, favors speed over perfection",
  },
  {
    label: "Autonomy Level",
    teamScore: 90,
    description: "High autonomy with minimal oversight, self-directed work style",
  },
];

export const interviewPrep: InterviewPrep = {
  candidateName: "Sarah Chen",
  role: "Senior Systems Engineer",
  time: "Today, 3:00 PM PST",
  matchedProject: "Epic-847: Kafka Migration",
  questions: [
    "At Scale AI, you migrated 14 services to Kafka. Walk me through your approach to handling exactly-once delivery guarantees across service boundaries.",
    "Your CDC implementation used Debezium — how did you handle schema evolution when the source PostgreSQL tables changed frequently?",
    "Our current monolith processes ~200K events/min. Based on your Scale AI experience, what would your Day 1 architecture look like for our migration?",
    "How did you approach observability for your Kafka consumers? We currently have blind spots in our event pipeline.",
    "We're considering KRaft over ZooKeeper. Given your production experience, what are the gotchas we should know about?",
  ],
  insights: [
    "Sarah's open-source Kafka monitoring tool has 2.3K GitHub stars",
    "She presented 'Kafka at Scale: Lessons from 14 Microservices' at QCon 2025",
    "Her blog post on CDC patterns was referenced in Confluent's official docs",
    "Culture vector shows 96% alignment — especially strong on async communication and documentation",
  ],
};

export const activityFeed = [
  {
    time: "2 min ago",
    event: "New signal detected",
    detail: "Jira Epic PLATFORM-847 created",
    type: "signal" as const,
  },
  {
    time: "5 min ago",
    event: "Candidates matched",
    detail: "5 engineers matched for Kafka migration",
    type: "match" as const,
  },
  {
    time: "12 min ago",
    event: "Culture scan complete",
    detail: "Team vector updated from Slack analysis",
    type: "culture" as const,
  },
  {
    time: "1 hour ago",
    event: "Interview prep generated",
    detail: "Cheat sheet ready for Sarah Chen interview",
    type: "prep" as const,
  },
  {
    time: "3 hours ago",
    event: "PR blocker detected",
    detail: "PR #482 stalled — WebGL expertise needed",
    type: "signal" as const,
  },
  {
    time: "Yesterday",
    event: "Candidate intro sent",
    detail: "Marcus Rivera intro sent to @daniel",
    type: "action" as const,
  },
];
