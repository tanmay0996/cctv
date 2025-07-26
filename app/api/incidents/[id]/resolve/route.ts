import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

// 🔧 Safe PrismaClient reuse
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params;

  const current = await prisma.incident.findUnique({ where: { id } });

  if (!current) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }

  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !current.resolved },
  });

  return NextResponse.json(updated);
}
