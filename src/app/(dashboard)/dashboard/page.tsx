"use client";

import { RefreshCw, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/dashboard/PageHeading";
import { StatCard } from "@/components/dashboard/StatCard";
import { Chart } from "@/components/dashboard/Chart";

export default function Dashboard() {
  const role = "admin";

  // Dummy data sementara menunggu Prisma
  const summary = {
    revenue: 125000000,
    revenueChange: 12.5,
    activeUsers: 8430,
    activeUsersChange: 5.2,
    conversionRate: 3.4,
    conversionChange: 0.8,
    orders: 1240,
    ordersChange: 8.4,
    chart: [],
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(value);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow={
          role === "admin" ? "Performance / 07 days" : "Your momentum / 07 days"
        }
        title="Dashboard"
        detail={
          role === "admin"
            ? "Baca ritme pertumbuhan workspace dan temukan ruang untuk bergerak lebih cepat."
            : "Sinyal personalmu, dirangkum untuk membantu fokus pada hal yang paling berdampak."
        }
        action={
          <button
            data-testid="button-refresh-dashboard"
            className="flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[12px] font-semibold transition-colors hover:bg-muted"
          >
            <RefreshCw size={14} /> Refresh data
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue"
          value={formatCurrency(summary.revenue)}
          change={`+${summary.revenueChange}%`}
          note="vs. 7 hari sebelumnya"
          tone="teal"
          delay="stagger-1"
        />
        <StatCard
          label="Active users"
          value={summary.activeUsers.toLocaleString("id-ID")}
          change={`+${summary.activeUsersChange}%`}
          note="pengguna aktif minggu ini"
          tone="coral"
          delay="stagger-2"
        />
        <StatCard
          label="Conversion rate"
          value={`${summary.conversionRate}%`}
          change={`+${summary.conversionChange}%`}
          note="dari seluruh visitor"
          tone="indigo"
          delay="stagger-3"
        />
        <StatCard
          label="Orders"
          value={summary.orders.toLocaleString("id-ID")}
          change={`+${summary.ordersChange}%`}
          note="transaksi berhasil"
          tone="gold"
          delay="stagger-4"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_.5fr]">
        <section className="animate-rise stagger-2 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="font-display text-lg font-semibold tracking-[-.03em]">
                Workspace momentum
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Performa relatif selama tujuh hari terakhir.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-primary" />
                Current
              </span>
              <span className="font-mono-ui text-primary">+18.4%</span>
            </div>
          </div>
          <Chart chart={summary.chart} />
        </section>

        <section className="animate-rise stagger-3 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-semibold tracking-[-.03em]">
                Health signal
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pemeriksaan cepat
              </p>
            </div>
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <div
            className="relative mx-auto grid h-36 w-36 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(hsl(var(--primary)) 0 86%, hsl(var(--muted)) 86% 100%)",
            }}
          >
            <div className="grid h-[126px] w-[126px] place-items-center rounded-full bg-card">
              <div className="text-center">
                <p className="font-display text-3xl font-semibold tracking-[-.07em]">
                  86
                </p>
                <p className="font-mono-ui text-[9px] uppercase text-muted-foreground">
                  score
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-[12px] font-medium">
            Workspace dalam ritme baik
          </p>
          <p className="mt-1 text-center text-[11px] leading-relaxed text-muted-foreground">
            Semua sinyal utama berada di atas baseline.
          </p>
        </section>
      </div>
    </div>
  );
}
