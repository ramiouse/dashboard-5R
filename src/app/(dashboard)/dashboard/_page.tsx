import { db } from "@/lib/db";
import { PageHeading } from "@/components/dashboard/PageHeading";

export default async function Home() {
  // Ambil data langsung dari PostgreSQL!
  const activities = await db.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
      <PageHeading
        eyebrow="Workspace overview"
        title="Selamat datang kembali"
        detail="Data ini diambil langsung dari PostgreSQL."
      />

      {/* Render aktivitas dari DB */}
      <div className="space-y-2">
        {activities.map((item) => (
          <div key={item.id} className="p-3 border rounded-xl bg-card">
            <p className="font-semibold">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
