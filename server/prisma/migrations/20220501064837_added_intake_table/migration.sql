-- CreateEnum
CREATE TYPE "IntakeStatus" AS ENUM ('Taken', 'Skipped', 'Unlisted');

-- CreateTable
CREATE TABLE "Intake" (
    "intakeId" TEXT NOT NULL,
    "status" "IntakeStatus" NOT NULL DEFAULT E'Unlisted',
    "date" TIMESTAMP(3),
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "Intake_pkey" PRIMARY KEY ("intakeId")
);

-- AddForeignKey
ALTER TABLE "Intake" ADD CONSTRAINT "Intake_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("scheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;
