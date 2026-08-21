import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Menjalankan EXPLAIN ANALYZE...\n");

  const result = await prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE SELECT * FROM "Asset" WHERE "name" ILIKE '%laptop%';
  `);

  // Print hasilnya biar rapi
  console.dir(result, { depth: null });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
