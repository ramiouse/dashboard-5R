import { Suspense } from "react";
import { PageHeading } from "@/components/dashboard/PageHeading";
import { AssetInventoryTable } from "@/components/dashboard/AssetInventoryTable";
import { LoadingBlock } from "@/components/ui/LoadingBlock";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

async function AssetInventoryData({
  q,
  location,
  page,
}: {
  q: string;
  location: string;
  page: number;
}) {
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

  const [total, rows, locationRows] = await Promise.all([
    db.asset.count({ where }),
    db.asset.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.asset.findMany({
      distinct: ["location"],
      select: { location: true },
      orderBy: { location: "asc" },
    }),
  ]);

  const assets = rows.map((row) => ({
    id: row.id,
    assetNo: row.assetNo,
    name: row.name,
    qty: row.qty,
    location: row.location,
    note: row.note,
    status: row.status,
    date: row.date.toISOString(),
  }));

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <AssetInventoryTable
      assets={assets}
      locations={locationRows.map((l) => l.location)}
      total={total}
      page={page}
      totalPages={totalPages}
      pageSize={PAGE_SIZE}
      query={q}
      selectedLocation={location}
    />
  );
}

export default async function InventarisAsetPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const location = params.location ?? "all";
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow="Asset management"
        title="Inventaris Aset"
        detail="Pantau seluruh aset workspace, cari cepat, dan filter berdasarkan lokasi."
      />
      <Suspense
        key={`${q}-${location}-${page}`}
        fallback={
          <div className="space-y-3 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
            <LoadingBlock className="h-9 w-full max-w-xs" />
            <LoadingBlock className="h-64 w-full" />
          </div>
        }
      >
        <AssetInventoryData q={q} location={location} page={page} />
      </Suspense>
    </div>
  );
}
