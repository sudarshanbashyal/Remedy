/*
  Warnings:

  - You are about to drop the column `frequencyForWeek` on the `Frequency` table. All the data in the column will be lost.
  - Added the required column `frequencyPerWeek` to the `Frequency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Frequency" DROP COLUMN "frequencyForWeek",
ADD COLUMN     "frequencyPerWeek" INTEGER NOT NULL;
