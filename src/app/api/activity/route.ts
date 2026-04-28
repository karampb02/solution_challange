import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = parseInt(searchParams.get("skip") || "0");

        const activities = await prisma.activity.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                timestamp: "desc",
            },
        });

        const total = await prisma.activity.count();

        return NextResponse.json({
            data: activities,
            pagination: {
                total,
                limit,
                skip,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json(
            { error: "Failed to fetch activities" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const activity = await prisma.activity.create({
            data: {
                type: body.type,
                title: body.title,
                description: body.description,
                timestamp: new Date(body.timestamp || Date.now()),
                metadata: body.metadata,
            },
        });

        return NextResponse.json(activity, { status: 201 });
    } catch (error) {
        console.error("Error creating activity:", error);
        return NextResponse.json(
            { error: "Failed to create activity" },
            { status: 500 }
        );
    }
}
