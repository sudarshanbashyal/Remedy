/*
  Warnings:

  - You are about to drop the column `day` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "day",
ADD COLUMN     "days" INTEGER[];
