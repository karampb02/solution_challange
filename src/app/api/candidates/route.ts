import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = parseInt(searchParams.get("skip") || "0");
        const sortBy = searchParams.get("sortBy") || "matchScore";
        const order = searchParams.get("order") || "desc";

        const candidates = await prisma.candidate.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                [sortBy]: order.toLowerCase(),
            },
        });

        const total = await prisma.candidate.count();

        return NextResponse.json({
            data: candidates,
            pagination: {
                total,
                limit,
                skip,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching candidates:", error);
        return NextResponse.json(
            { error: "Failed to fetch candidates" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const candidate = await prisma.candidate.create({
            data: {
                name: body.name,
                avatar: body.avatar,
                title: body.title,
                location: body.location,
                matchScore: body.matchScore,
                cultureScore: body.cultureScore,
                skills: body.skills,
                highlight: body.highlight,
                availability: body.availability,
                source: body.source,
                experience: body.experience,
            },
        });

        return NextResponse.json(candidate, { status: 201 });
    } catch (error) {
        console.error("Error creating candidate:", error);
        return NextResponse.json(
            { error: "Failed to create candidate" },
            { status: 500 }
        );
    }
}
