/*
  Warnings:

  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" TEXT NOT NULL,
ALTER COLUMN "verified" SET DEFAULT true;

-- CreateTable
CREATE TABLE "UserRole" (
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("roleId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
