  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

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
          value={selectedLocation}
          onChange={(e) => updateParams({ location: e.target.value, page: null })}
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

      {isPending ? (
        <AssetTableSkeleton rows={Math.min(pageSize, assets.length || 8)} />
      ) : assets.length === 0 ? (
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
        <>
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
                {assets.map((asset, index) => (
                  <tr
                    data-testid={`row-asset-${asset.id}`}
                    key={asset.id}
                    className="border-b border-border/60 transition-colors hover:bg-muted/50"
                  >
                    <td className="py-3 pr-3 text-muted-foreground">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="py-3 pr-3 font-mono-ui">{asset.assetNo}</td>
                    <td className="py-3 pr-3 font-medium">{asset.name}</td>
                    <td className="py-3 pr-3">{asset.qty}</td>
                    <td className="py-3 pr-3">{asset.location}</td>
                    <td className="py-3 pr-3 text-muted-foreground">
                      {asset.note || "-"}
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-lg px-2 py-1 font-mono-ui text-[10px] font-medium ${
                          statusStyles[asset.status] ?? "bg-muted text-muted-foreground"
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

          <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-4 sm:flex-row">
            <p className="text-[11px] text-muted-foreground">
              Menampilkan {from}–{to} dari {total} aset
            </p>
            <div className="flex items-center gap-2">
              <button
                data-testid="button-prev-page"
                disabled={page <= 1}
                onClick={() => updateParams({ page: String(page - 1) })}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} /> Sebelumnya
              </button>
              <span className="font-mono-ui text-[11px] text-muted-foreground">
                {page} / {totalPages}
              </span>
              <button
                data-testid="button-next-page"
                disabled={page >= totalPages}
                onClick={() => updateParams({ page: String(page + 1) })}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function AssetTableSkeleton({ rows }: { rows: number }) {
  return (
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
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-border/60">
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-4" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-16" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-32" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-6" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-20" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-24" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-5 w-16 rounded-lg" /></td>
              <td className="py-3 pr-3"><LoadingBlock className="h-3 w-16" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}