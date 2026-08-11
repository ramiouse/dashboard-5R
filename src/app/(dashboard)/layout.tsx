"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Gauge,
  Home as HomeIcon,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

// TODO: Jika lu udah setup API untuk Health Check, lu bisa panggil di sini
// import { useHealthCheck } from '@workspace/api-client-react';

type Role = "admin" | "user";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-primary text-primary-foreground shadow-sm">
        <span className="font-display text-[17px] font-bold tracking-[-.08em]">
          lu
        </span>
      </div>
      <span className="font-display text-[21px] font-semibold tracking-[-.055em]">
        luma<span className="text-primary">.</span>
      </span>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Catatan: Sementara role di-hardcode. Ke depannya lu bisa pakai Context API, Zustand,
  // atau baca dari database PostgreSQL lu untuk role user yang login.
  const [role] = useState<Role>("admin");

  // Mock data health (ganti pakai useHealthCheck kalau backend udah siap)
  const health = { status: "ok" };
  const healthLoading = false;

  const adminNav = [
    { href: "/", label: "Beranda", icon: HomeIcon },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/settings", label: "Pengaturan", icon: SettingsIcon },
  ];

  const userNav = [
    { href: "/", label: "Ringkasan saya", icon: HomeIcon },
    { href: "/dashboard", label: "Momentum", icon: Gauge },
    { href: "/settings", label: "Preferensi", icon: SettingsIcon },
  ];

  const nav = role === "admin" ? adminNav : userNav;

  return (
    <div className="noise flex min-h-[100dvh] bg-background">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="text-sidebar-foreground">
            <Logo />
          </div>
          <button
            data-testid="button-close-mobile-nav"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sidebar-foreground/40">
          {role === "admin" ? "Workspace" : "Personal space"}
        </div>

        <nav className="space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                pathname === href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
              }`}
            >
              <Icon size={17} strokeWidth={pathname === href ? 2.4 : 1.8} />
              <span>{label}</span>
              {href === "/dashboard" && role === "admin" && (
                <span className="ml-auto rounded-md bg-sidebar-primary/15 px-1.5 py-0.5 font-mono-ui text-[9px] text-sidebar-primary">
                  LIVE
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="mb-5 rounded-2xl border border-sidebar-border bg-sidebar-accent/50 p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  health?.status === "ok"
                    ? "bg-sidebar-primary"
                    : healthLoading
                      ? "bg-sidebar-foreground/30 skeleton"
                      : "bg-accent"
                }`}
              />
              <span className="text-[11px] font-medium text-sidebar-foreground/70">
                {health?.status === "ok"
                  ? "Semua sistem normal"
                  : healthLoading
                    ? "Memeriksa sistem…"
                    : "Sistem perlu perhatian"}
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-sidebar-foreground/40">
              Data diperbarui otomatis setiap 15 menit.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-2 py-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#e9a07d] text-[11px] font-bold text-[#452d29]">
              NA
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">Nadia Arifin</p>
              <p className="text-[10px] capitalize text-sidebar-foreground/45">
                {role === "admin" ? "Administrator" : "Member"}
              </p>
            </div>
            <button
              data-testid="button-profile-menu"
              className="text-sidebar-foreground/40 hover:text-sidebar-foreground"
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <button
          aria-label="Tutup navigasi"
          data-testid="button-overlay-mobile-nav"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-[hsl(227_27%_18%/.35)] md:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="min-w-0 flex-1">
        <header className="flex h-[68px] items-center justify-between border-b border-border/80 bg-background/85 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              data-testid="button-open-mobile-nav"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
            >
              <Menu size={19} />
            </button>
            <div className="hidden text-[11px] font-medium text-muted-foreground sm:block">
              <span className="text-foreground/45">Workspace / </span>
              {pathname === "/"
                ? role === "admin"
                  ? "Beranda"
                  : "Ringkasan saya"
                : pathname === "/dashboard"
                  ? role === "admin"
                    ? "Dashboard"
                    : "Momentum"
                  : "Pengaturan"}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 sm:flex">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  health?.status === "ok" ? "bg-primary" : "bg-accent"
                }`}
              />
              <span className="font-mono-ui text-[10px] text-muted-foreground">
                LIVE DATA
              </span>
            </div>
            <button
              data-testid="button-help"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <CircleHelp size={17} />
            </button>
            <button
              data-testid="button-notifications"
              className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <div className="ml-1 h-6 w-px bg-border" />
            <div className="hidden items-center gap-2 sm:flex">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[#e9a07d] text-[9px] font-bold text-[#452d29]">
                NA
              </div>
              <span className="text-[12px] font-medium">Nadia</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* AREA INJEKSI HALAMAN */}
        <div className="dashboard-grid min-h-[calc(100dvh-68px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
