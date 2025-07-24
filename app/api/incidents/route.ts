import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get("resolved");

  const incidents = await prisma.incident.findMany({
    where: { resolved: resolved === "false" ? false : undefined },
    orderBy: { tsStart: "desc" },
    include: { camera: true },
  });

  return NextResponse.json(incidents);
}
