import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const cultureDimensions = await prisma.cultureDimension.findMany({
            orderBy: {
                label: "asc",
            },
        });

        return NextResponse.json({
            data: cultureDimensions,
        });
    } catch (error) {
        console.error("Error fetching culture dimensions:", error);
        return NextResponse.json(
            { error: "Failed to fetch culture dimensions" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const dimension = await prisma.cultureDimension.create({
            data: {
                label: body.label,
                teamScore: body.teamScore,
                description: body.description,
            },
        });

        return NextResponse.json(dimension, { status: 201 });
    } catch (error) {
        console.error("Error creating culture dimension:", error);
        return NextResponse.json(
            { error: "Failed to create culture dimension" },
            { status: 500 }
        );
    }
}
