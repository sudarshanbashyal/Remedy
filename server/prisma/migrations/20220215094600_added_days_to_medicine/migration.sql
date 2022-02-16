/*
  Warnings:

  - You are about to drop the column `days` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "days" INTEGER[];

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "days";
