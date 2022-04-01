/*
  Warnings:

  - You are about to drop the column `firstUser` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `secondUser` on the `Request` table. All the data in the column will be lost.
  - Added the required column `receivingUser` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendingUser` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_firstUser_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_secondUser_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "firstUser",
DROP COLUMN "secondUser",
ADD COLUMN     "receivingUser" TEXT NOT NULL,
ADD COLUMN     "sendingUser" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_sendingUser_fkey" FOREIGN KEY ("sendingUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receivingUser_fkey" FOREIGN KEY ("receivingUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
