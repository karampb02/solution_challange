import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInsights, suggestInterviewQuestions } from "@/lib/gemini";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = parseInt(searchParams.get("skip") || "0");

        const interviews = await prisma.interviewPrep.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                time: "asc",
            },
        });

        const total = await prisma.interviewPrep.count();

        return NextResponse.json({
            data: interviews,
            pagination: {
                total,
                limit,
                skip,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch interviews" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Generate interview questions using Gemini
        const questions = await suggestInterviewQuestions(
            body.candidateBackground || "",
            body.role
        );

        const interview = await prisma.interviewPrep.create({
            data: {
                candidateId: body.candidateId,
                candidateName: body.candidateName,
                role: body.role,
                time: new Date(body.time),
                matchedProject: body.matchedProject,
                questions,
                insights: body.insights || [],
            },
        });

        return NextResponse.json(interview, { status: 201 });
    } catch (error) {
        console.error("Error creating interview:", error);
        return NextResponse.json(
            { error: "Failed to create interview" },
            { status: 500 }
        );
    }
}
