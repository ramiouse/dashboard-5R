import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = ["user", "admin", "editor"];
const activityTypes = ["login", "update", "delete", "create", "export"];
const firstNames = [
  "Andi",
  "Budi",
  "Citra",
  "Dewi",
  "Eka",
  "Fajar",
  "Gita",
  "Hadi",
  "Indah",
  "Joko",
];
const lastNames = [
  "Saputra",
  "Wijaya",
  "Pratama",
  "Lestari",
  "Kurniawan",
  "Santoso",
  "Utami",
  "Setiawan",
];

// Data Dummy khusus untuk Asset
const assetNames = [
  "MacBook Pro M2",
  "ThinkPad T14",
  "Dell XPS 15",
  "iPhone 13",
  "iPad Pro",
  "Monitor Dell 27",
  "Keyboard Keychron",
  "Meja Kantor",
  "Kursi Ergonomis",
  "Router MikroTik",
];
const assetStatuses = ["active", "maintenance", "retired"];
const locations = [
  "Gudang Utama",
  "Ruang Server",
  "Kantor Pusat",
  "Gudang Cabang",
  "Lantai 2",
];
const notes = [
  "Kondisi sangat baik",
  "Lecet pemakaian",
  "Baru dibeli bulan lalu",
  "Perlu kalibrasi",
  null,
]; // null karena note opsional (?)

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log("Seeding 50 Users...");
  const users = [];
  for (let i = 0; i < 50; i++) {
    const first = randomFrom(firstNames);
    const last = randomFrom(lastNames);
    const user = await prisma.user.create({
      data: {
        email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
        name: `${first} ${last}`,
        role: randomFrom(roles),
      },
    });
    users.push(user);
  }

  console.log("Seeding 50 Activities...");
  for (let i = 0; i < 50; i++) {
    const type = randomFrom(activityTypes);
    await prisma.activity.create({
      data: {
        title: `${type} action #${i + 1}`,
        detail: `Dummy activity detail for ${type} performed by ${randomFrom(users).name}`,
        type,
        time: new Date().toISOString(),
      },
    });
  }

  console.log("Seeding 50 Assets...");
  for (let i = 0; i < 50; i++) {
    const name = randomFrom(assetNames);
    const status = randomFrom(assetStatuses);
    const location = randomFrom(locations);
    const note = randomFrom(notes);

    // Generate assetNo unik, contoh: AST-0001, AST-0002
    const assetNo = `AST-${String(i + 1).padStart(4, "0")}`;

    // Generate qty acak antara 1 sampai 10
    const qty = Math.floor(Math.random() * 10) + 1;

    await prisma.asset.create({
      data: {
        assetNo,
        name: `${name} #${i + 1}`,
        qty,
        location,
        note,
        status,
        // date, createdAt, updatedAt tidak perlu diisi karena sudah @default(now()) / @updatedAt
      },
    });
  }

  console.log("Selesai. 50 User, 50 Activity, dan 50 Asset berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
