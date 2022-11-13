/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
