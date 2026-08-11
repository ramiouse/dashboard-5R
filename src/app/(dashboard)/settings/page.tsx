"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Gauge, UsersRound } from "lucide-react";
import { PageHeading } from "@/components/dashboard/PageHeading";

type Role = "admin" | "user";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [role, setRole] = useState<Role>("admin");
  const [saved, setSaved] = useState(false);

  const chooseRole = (next: Role) => {
    setRole(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow="Workspace preferences"
        title="Pengaturan"
        detail="Sesuaikan Luma dengan cara tim kamu membaca momentum."
        action={
          saved ? (
            <span className="rounded-xl bg-primary/10 px-3.5 py-2.5 text-[12px] font-semibold text-primary">
              Preferensi tersimpan
            </span>
          ) : undefined
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <section className="rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="mb-7">
            <p className="font-display text-lg font-semibold tracking-[-.03em]">
              Mode tampilan
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Pilih atmosfer yang paling nyaman untuk bekerja.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              data-testid="button-theme-light"
              onClick={() => setTheme("light")}
              className={`group rounded-xl border p-3 text-left transition-all ${theme === "light" ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:bg-muted"}`}
            >
              <div className="mb-3 flex h-24 items-end gap-1 rounded-lg bg-[#f4f0e6] p-3">
                <div className="h-full w-1/4 rounded bg-[#24283a]" />
                <div className="h-3/4 flex-1 rounded bg-[#d9e6df]" />
                <div className="h-1/2 w-1/4 rounded bg-[#e9a07d]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">
                  Light / Daylight
                </span>
                {theme === "light" && (
                  <span className="font-mono-ui text-[9px] text-primary">
                    ACTIVE
                  </span>
                )}
              </div>
            </button>
            <button
              data-testid="button-theme-dark"
              onClick={() => setTheme("dark")}
              className={`group rounded-xl border p-3 text-left transition-all ${theme === "dark" ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:bg-muted"}`}
            >
              <div className="mb-3 flex h-24 items-end gap-1 rounded-lg bg-[#171a29] p-3">
                <div className="h-full w-1/4 rounded bg-[#f1eee3]" />
                <div className="h-3/4 flex-1 rounded bg-[#29494a]" />
                <div className="h-1/2 w-1/4 rounded bg-[#e99573]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">
                  Dark / Night shift
                </span>
                {theme === "dark" && (
                  <span className="font-mono-ui text-[9px] text-primary">
                    ACTIVE
                  </span>
                )}
              </div>
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-card-border bg-card p-6 sm:p-7">
          <div className="mb-7">
            <p className="font-display text-lg font-semibold tracking-[-.03em]">
              Role mode
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Atur kedalaman workspace yang kamu butuhkan.
            </p>
          </div>
          <div className="space-y-3">
            <button
              data-testid="button-role-admin"
              onClick={() => chooseRole("admin")}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${role === "admin" ? "border-primary bg-primary/5 ring-1 ring-primary/25" : "border-border hover:bg-muted"}`}
            >
              <UsersRound
                size={17}
                className={`mt-0.5 ${role === "admin" ? "text-primary" : "text-muted-foreground"}`}
              />
              <span>
                <span className="block text-[12px] font-semibold">
                  Administrator
                </span>
                <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                  Overview workspace, performance, dan health signals.
                </span>
              </span>
            </button>
            <button
              data-testid="button-role-user"
              onClick={() => chooseRole("user")}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${role === "user" ? "border-primary bg-primary/5 ring-1 ring-primary/25" : "border-border hover:bg-muted"}`}
            >
              <Gauge
                size={17}
                className={`mt-0.5 ${role === "user" ? "text-primary" : "text-muted-foreground"}`}
              />
              <span>
                <span className="block text-[12px] font-semibold">
                  Team member
                </span>
                <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                  Fokus personal, ritme kerja, dan momentum kamu.
                </span>
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
