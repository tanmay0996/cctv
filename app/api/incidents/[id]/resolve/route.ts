import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
