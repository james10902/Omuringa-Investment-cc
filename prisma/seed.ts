/**
 * Omuringa Investment CC — Database Seed
 * Creates the initial Super Admin account.
 *
 * Run with: npx ts-node prisma/seed.ts
 * Or add to package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
 * Then run: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Super Admin
  const adminEmail = "admin@omuringa.com";
  const adminPassword = "Admin@2025!"; // Change immediately after first login

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: "Omuringa Admin",
        email: adminEmail,
        phone: "+264 81 728 6079",
        password: hashed,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log(`✅ Super Admin created: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN`);
  } else {
    console.log(`ℹ️  Admin already exists: ${adminEmail}`);
  }

  // Create Application Admin
  const appAdminEmail = "applications@omuringa.com";
  const appAdminExisting = await prisma.user.findUnique({ where: { email: appAdminEmail } });

  if (!appAdminExisting) {
    const hashed = await bcrypt.hash("AppAdmin@2025!", 12);
    await prisma.user.create({
      data: {
        name: "Applications Admin",
        email: appAdminEmail,
        phone: "+264 81 728 6079",
        password: hashed,
        role: "APPLICATION_ADMIN",
        isActive: true,
      },
    });
    console.log(`✅ Application Admin created: ${appAdminEmail}`);
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
