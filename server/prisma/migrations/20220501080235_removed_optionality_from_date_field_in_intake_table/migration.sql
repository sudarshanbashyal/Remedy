/*
  Warnings:

  - Made the column `date` on table `Intake` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Intake" ALTER COLUMN "date" SET NOT NULL;
