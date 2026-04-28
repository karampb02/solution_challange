import { prisma } from "@/lib/prisma";

async function main() {
    console.log("Seeding database...");

    // Clear existing data
    await prisma.signalMatch.deleteMany();
    await prisma.signal.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.cultureDimension.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.interviewPrep.deleteMany();

    // Seed candidates
    const candidates = await Promise.all([
        prisma.candidate.create({
            data: {
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
        }),
        prisma.candidate.create({
            data: {
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
        }),
        prisma.candidate.create({
            data: {
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
        }),
    ]);

    console.log(`Created ${candidates.length} candidates`);

    // Seed signals
    const signals = await Promise.all([
        prisma.signal.create({
            data: {
                type: "jira",
                title: "Need Kafka expert for event streaming migration",
                description:
                    "Looking for someone who can lead our migration from SQS to Kafka infrastructure",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                urgency: "high",
                status: "new",
                source: "Platform team",
            },
        }),
        prisma.signal.create({
            data: {
                type: "github",
                title: "PR review: Kubernetes deployment optimization",
                description:
                    "Expert needed to review complex Kubernetes configuration changes",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                urgency: "medium",
                status: "new",
                source: "DevOps team",
            },
        }),
    ]);

    console.log(`Created ${signals.length} signals`);

    // Seed culture dimensions
    await Promise.all([
        prisma.cultureDimension.create({
            data: {
                label: "Collaboration",
                teamScore: 85,
                description: "How well we work together as a team",
            },
        }),
        prisma.cultureDimension.create({
            data: {
                label: "Innovation",
                teamScore: 92,
                description: "How much we encourage new ideas and experimentation",
            },
        }),
        prisma.cultureDimension.create({
            data: {
                label: "Ownership",
                teamScore: 88,
                description: "How much we take responsibility for our work",
            },
        }),
    ]);

    console.log("Seeded culture dimensions");

    // Create signal matches
    if (candidates.length > 0 && signals.length > 0) {
        await prisma.signalMatch.create({
            data: {
                signalId: signals[0].id,
                candidateId: candidates[0].id,
                matchScore: 0.95,
            },
        });
        console.log("Created signal matches");
    }

    console.log("Database seeded successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
