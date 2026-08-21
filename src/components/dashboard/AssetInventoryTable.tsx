"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { LoadingBlock } from "@/components/ui/LoadingBlock";

interface AssetItem {
  id: string;
  assetNo: string;
  name: string;
  qty: number;
  location: string;
  note: string | null;
  status: string;
  date: string;
}

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  maintenance: "bg-accent/15 text-accent",
  broken: "bg-destructive/10 text-destructive",
  retired: "bg-muted text-muted-foreground",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function AssetInventoryTable({
  initialAssets,
  initialTotal,
  initialTotalPages,
  locations,
  pageSize,
}: {
  initialAssets: AssetItem[];
  initialTotal: number;
  initialTotalPages: number;
  locations: string[];
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [assets, setAssets] = useState(initialAssets);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(
    Number(searchParams.get("page") ?? "1") || 1,
  );
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [location, setLocation] = useState(
    searchParams.get("location") ?? "all",
  );
  const [inputValue, setInputValue] = useState(query);
  const [loading, setLoading] = useState(false);

  // requestId guards against out-of-order responses (race condition)
  const requestId = useRef(0);

  const fetchData = useCallback(
    async (nextQ: string, nextLocation: string, nextPage: number) => {
      const id = ++requestId.current;
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (nextQ) params.set("q", nextQ);
        if (nextLocation !== "all") params.set("location", nextLocation);
        params.set("page", String(nextPage));

        const res = await fetch(`/api/assets?${params.toString()}`);
        if (!res.ok) throw new Error("Gagal memuat data aset");
        const data = await res.json();

        if (id !== requestId.current) return; // response usang, diabaikan

        setAssets(data.assets);
        setTotal(data.total);
        setTotalPages(data.totalPages);

        const urlParams = new URLSearchParams();
        if (nextQ) urlParams.set("q", nextQ);
        if (nextLocation !== "all") urlParams.set("location", nextLocation);
        if (nextPage > 1) urlParams.set("page", String(nextPage));
        const qs = urlParams.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      } catch (err) {
        // Kegagalan network di-swallow ke console; UI tetap tampilkan data lama.
        // Kalau perlu ditampilkan ke user, ganti dengan ErrorState.
        console.error(err);
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [pathname, router],
  );

  // Debounce search input
  useEffect(() => {
    const handle = setTimeout(() => {
      if (inputValue !== query) {
        setQuery(inputValue);
        setPage(1);
        fetchData(inputValue, location, 1);
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function handleLocationChange(next: string) {
    setLocation(next);
    setPage(1);
    fetchData(query, next, 1);
  }

  function handlePageChange(next: number) {
    setPage(next);
    fetchData(query, location, next);
  }

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const showEmpty = !loading && assets.length === 0;

  return (
    <section className="animate-rise rounded-2xl border border-card-border bg-card p-6 sm:p-7">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            data-testid="input-search-asset"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Cari no aset, nama, catatan..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-[12px] outline-none transition-colors focus:border-primary"
          />
        </div>
        <select
          data-testid="select-filter-location"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[12px] outline-none transition-colors focus:border-primary sm:w-auto"
        >
          <option value="all">Semua lokasi</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {showEmpty ? (
        <div
          data-testid="empty-asset-inventory"
          className="rounded-xl border border-dashed border-border px-5 py-9 text-center"
        >
          <p className="text-sm font-medium">Tidak ada aset ditemukan</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Coba ubah kata kunci pencarian atau filter lokasi.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[.08em] text-muted-foreground">
                <th className="py-3 pr-3 font-medium">No</th>
                <th className="py-3 pr-3 font-medium">No Aset</th>
                <th className="py-3 pr-3 font-medium">Nama Aset</th>
                <th className="py-3 pr-3 font-medium">Qty</th>
                <th className="py-3 pr-3 font-medium">Lokasi</th>
                <th className="py-3 pr-3 font-medium">Note</th>
                <th className="py-3 pr-3 font-medium">Status</th>
                <th className="py-3 pr-3 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: pageSize }).map((_, i) => (
                    <tr
                      key={`skeleton-${i}`}
                      className="border-b border-border/60"
                    >
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-4" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-16" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-32" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-6" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-20" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-24" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-5 w-16 rounded-lg" />
                      </td>
                      <td className="py-3 pr-3">
                        <LoadingBlock className="h-3 w-16" />
                      </td>
                    </tr>
                  ))
                : assets.map((asset, index) => (
                    <tr
                      data-testid={`row-asset-${asset.id}`}
                      key={asset.id}
                      className="border-b border-border/60 transition-colors hover:bg-muted/50"
                    >
                      <td className="py-3 pr-3 text-muted-foreground">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="py-3 pr-3 font-mono-ui">
                        {asset.assetNo}
                      </td>
                      <td className="py-3 pr-3 font-medium">{asset.name}</td>
                      <td className="py-3 pr-3">{asset.qty}</td>
                      <td className="py-3 pr-3">{asset.location}</td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {asset.note || "-"}
                      </td>
                      <td className="py-3 pr-3">
                        <span
                          className={`rounded-lg px-2 py-1 font-mono-ui text-[10px] font-medium ${
                            statusStyles[asset.status] ??
                            "bg-muted text-muted-foreground"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {formatDate(asset.date)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}

      {!showEmpty && (
        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-4 sm:flex-row">
          <p className="text-[11px] text-muted-foreground">
            Menampilkan {from}–{to} dari {total} aset
          </p>
          <div className="flex items-center gap-2">
            <button
              data-testid="button-prev-page"
              disabled={page <= 1 || loading}
              onClick={() => handlePageChange(page - 1)}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>
            <span className="font-mono-ui text-[11px] text-muted-foreground">
              {page} / {totalPages}
            </span>
            <button
              data-testid="button-next-page"
              disabled={page >= totalPages || loading}
              onClick={() => handlePageChange(page + 1)}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              Berikutnya <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
