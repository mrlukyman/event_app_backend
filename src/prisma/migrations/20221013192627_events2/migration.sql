-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
