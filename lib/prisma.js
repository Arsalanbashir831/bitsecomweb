import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis

export const prisma = globalForPrisma.__prisma ?? new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.bitspakistan_DATABASE_URL }),
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.__prisma = prisma
