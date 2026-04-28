import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = parseInt(searchParams.get("skip") || "0");
        const status = searchParams.get("status");
        const urgency = searchParams.get("urgency");

        const where: any = {};
        if (status) where.status = status;
        if (urgency) where.urgency = urgency;

        const signals = await prisma.signal.findMany({
            where,
            take: limit,
            skip: skip,
            orderBy: {
                timestamp: "desc",
            },
            include: {
                matchedCandidates: {
                    include: {
                        candidate: true,
                    },
                },
            },
        });

        const total = await prisma.signal.count({ where });

        return NextResponse.json({
            data: signals,
            pagination: {
                total,
                limit,
                skip,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching signals:", error);
        return NextResponse.json(
            { error: "Failed to fetch signals" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const signal = await prisma.signal.create({
            data: {
                type: body.type,
                title: body.title,
                description: body.description,
                timestamp: new Date(body.timestamp),
                urgency: body.urgency,
                status: body.status || "new",
                source: body.source,
            },
        });

        return NextResponse.json(signal, { status: 201 });
    } catch (error) {
        console.error("Error creating signal:", error);
        return NextResponse.json(
            { error: "Failed to create signal" },
            { status: 500 }
        );
    }
}
