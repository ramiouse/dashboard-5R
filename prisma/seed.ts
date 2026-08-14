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

  console.log("Selesai. 50 User + 50 Activity berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
