import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const location = searchParams.get("location") ?? "all";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const where: Prisma.AssetWhereInput = {
    AND: [
      location !== "all" ? { location } : {},
      q
        ? {
            OR: [
              { assetNo: { contains: q, mode: "insensitive" } },
              { name: { contains: q, mode: "insensitive" } },
              { note: { contains: q, mode: "insensitive" } },
              { status: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  };

  const [total, rows] = await Promise.all([
    db.asset.count({ where }),
    db.asset.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  return NextResponse.json({
    assets: rows.map((row) => ({
      id: row.id,
      assetNo: row.assetNo,
      name: row.name,
      qty: row.qty,
      location: row.location,
      note: row.note,
      status: row.status,
      date: row.date.toISOString(),
    })),
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    page,
    pageSize: PAGE_SIZE,
  });
}
