import { PageHeading } from "@/components/dashboard/PageHeading";
import { AssetInventoryTable } from "@/components/dashboard/AssetInventoryTable";
import { db } from "@/lib/db";

const PAGE_SIZE = 20;

export default async function InventarisAsetPage() {
  const [rows, total, locationRows] = await Promise.all([
    db.asset.findMany({ orderBy: { date: "desc" }, take: PAGE_SIZE }),
    db.asset.count(),
    db.asset.findMany({
      distinct: ["location"],
      select: { location: true },
      orderBy: { location: "asc" },
    }),
  ]);

  const initialAssets = rows.map((row) => ({
    id: row.id,
    assetNo: row.assetNo,
    name: row.name,
    qty: row.qty,
    location: row.location,
    note: row.note,
    status: row.status,
    date: row.date.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow="Asset management"
        title="Inventaris Aset"
        detail="Pantau seluruh aset workspace, cari cepat, dan filter berdasarkan lokasi."
      />
      <AssetInventoryTable
        initialAssets={initialAssets}
        initialTotal={total}
        initialTotalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        locations={locationRows.map((l) => l.location)}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
