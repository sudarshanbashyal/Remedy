/*
  Warnings:

  - You are about to drop the column `intakeTIme` on the `Intake` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Intake" DROP COLUMN "intakeTIme",
ADD COLUMN     "intakeTime" TIMESTAMP(3);
