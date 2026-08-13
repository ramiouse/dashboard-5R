"use client";

import Link from "next/link";
import { Gauge, MoreHorizontal, Zap } from "lucide-react";
import { PageHeading } from "@/components/dashboard/PageHeading";
import { LoadingBlock } from "@/components/ui/LoadingBlock";

type ActivityType = "success" | "warning" | "info";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  time: string;
}

// TODO: ganti mock ini dengan query database (Prisma) atau API call beneran
const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "success",
    title: "Deployment berhasil ke production",
    detail: "Build #482 selesai tanpa error, semua test lolos.",
    time: "10 menit lalu",
  },
  {
    id: "2",
    type: "info",
    title: "3 anggota baru bergabung ke workspace",
    detail: "Tim engineering menambah kapasitas untuk sprint berikutnya.",
    time: "1 jam lalu",
  },
  {
    id: "3",
    type: "warning",
    title: "Penggunaan storage mendekati batas",
    detail: "82% dari kuota bulanan sudah terpakai.",
    time: "3 jam lalu",
  },
  {
    id: "4",
    type: "success",
    title: "Invoice #2291 telah dibayar",
    detail: "Pembayaran diterima dari klien Nusantara Retail.",
    time: "5 jam lalu",
  },
  {
    id: "5",
    type: "info",
    title: "Laporan mingguan sudah tersedia",
    detail: "Ringkasan performa minggu ini siap ditinjau.",
    time: "Kemarin",
  },
];

export default function Home() {
  const role = "admin"; // Nanti ini diganti dengan data role user aktif
  const isLoading = false;
  const items: ActivityItem[] = mockActivity; // Nanti diganti pakai query ke database (Prisma)

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow={role === "admin" ? "Workspace overview" : "Your workspace"}
        title={
          role === "admin"
            ? "Selamat datang kembali, Nadia."
            : "Selamat datang, Nadia."
        }
        detail={
          role === "admin"
            ? "Satu pandangan untuk membaca kesehatan bisnis dan menjaga tim tetap mengarah ke hal yang penting."
            : "Ringkasan momentum yang paling relevan dengan pekerjaanmu hari ini."
        }
        action={
          <Link
            href="/dashboard"
            data-testid="link-open-dashboard"
            className="group flex w-fit items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-[12px] font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Buka dashboard{" "}
            <Zap
              size={14}
              className="text-accent transition-transform group-hover:rotate-12"
            />
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <section className="animate-rise stagger-1 relative min-h-[275px] overflow-hidden rounded-2xl bg-sidebar p-6 text-sidebar-foreground sm:p-8">
          <div className="relative z-10 max-w-md">
            <div className="mb-7 flex items-center gap-2">
              <span className="rounded-full bg-sidebar-primary/15 px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider text-sidebar-primary">
                MORNING BRIEF
              </span>
              <span className="font-mono-ui text-[10px] text-sidebar-foreground/35">
                08.42 WIB
              </span>
            </div>
            <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-semibold leading-[1.04] tracking-[-.055em]">
              Momentum yang jelas,
              <br />
              <span className="text-sidebar-primary">
                keputusan yang tenang.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-[12px] leading-relaxed text-sidebar-foreground/55">
              {role === "admin"
                ? "Performa minggu ini bergerak di atas ritme normal. Lihat apa yang berubah dan mengapa."
                : "Kamu punya ritme yang baik minggu ini. Lihat prioritas yang sedang bergerak."}
            </p>
          </div>
          <div className="absolute -right-8 -top-14 h-64 w-64 rounded-full border border-sidebar-primary/20" />
          <div className="absolute -right-20 -top-1 h-64 w-64 rounded-full border border-sidebar-primary/10" />
          <div className="absolute -bottom-20 right-10 h-44 w-44 rounded-full bg-sidebar-primary/8 blur-2xl" />
          <div className="absolute bottom-6 right-7 font-mono-ui text-[10px] text-sidebar-foreground/25">
            LUMA / 01
          </div>
        </section>
        <section className="animate-rise stagger-2 flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
                <Gauge size={17} />
              </div>
              <span className="font-mono-ui text-[10px] text-muted-foreground">
                THIS WEEK
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground">Workspace pulse</p>
            <p className="mt-1 font-display text-4xl font-semibold tracking-[-.06em]">
              +18.4<span className="text-xl text-primary">%</span>
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              dibanding minggu lalu
            </p>
          </div>
          <div className="mt-7 flex items-end gap-1.5">
            {[30, 45, 38, 61, 54, 72, 86].map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm ${i === 6 ? "bg-primary" : "bg-primary/20"}`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </section>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.76fr]">
        <section className="animate-rise stagger-3 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-semibold tracking-[-.03em]">
                Aktivitas terbaru
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Yang bergerak di workspace kamu.
              </p>
            </div>
            <button
              data-testid="button-filter-activity"
              className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <LoadingBlock className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <LoadingBlock className="h-3 w-2/3" />
                    <LoadingBlock className="mt-2 h-2.5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div
              data-testid="empty-activity"
              className="rounded-xl border border-dashed border-border px-5 py-9 text-center"
            >
              <p className="text-sm font-medium">Belum ada aktivitas</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Aktivitas workspace akan muncul di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {items.slice(0, 5).map((item) => (
                <div
                  data-testid={`activity-item-${item.id}`}
                  key={item.id}
                  className="group flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
                >
                  <div
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                      item.type === "success"
                        ? "bg-primary/12 text-primary"
                        : item.type === "warning"
                          ? "bg-accent/15 text-accent"
                          : "bg-[#5d6baf]/12 text-[#5665a6]"
                    }`}
                  >
                    <span className="font-mono-ui text-[10px] font-semibold">
                      {item.type === "success"
                        ? "OK"
                        : item.type === "warning"
                          ? "!"
                          : "i"}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <time className="shrink-0 pt-0.5 font-mono-ui text-[10px] text-muted-foreground/70">
                    {item.time}
                  </time>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="animate-rise stagger-4 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="mb-6">
            <p className="font-display text-lg font-semibold tracking-[-.03em]">
              At a glance
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Sinyal kecil, konteks besar.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <span className="text-[12px] text-muted-foreground">
                Team velocity
              </span>
              <span className="font-mono-ui text-[12px] font-medium text-primary">
                92 / 100
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <span className="text-[12px] text-muted-foreground">
                Focus score
              </span>
              <span className="font-mono-ui text-[12px] font-medium">
                8.6 hrs
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <span className="text-[12px] text-muted-foreground">
                Active streams
              </span>
              <span className="font-mono-ui text-[12px] font-medium">14</span>
            </div>
            <div className="rounded-xl bg-primary/8 p-4">
              <p className="text-[11px] font-semibold text-primary">
                Sinyal hari ini
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Conversion naik stabil selama 3 hari. Pertahankan channel yang
                sudah bekerja.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
