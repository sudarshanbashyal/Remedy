-- CreateEnum
CREATE TYPE "RequestStatusType" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "Request" (
    "requestId" TEXT NOT NULL,
    "status" "RequestStatusType" NOT NULL DEFAULT E'Pending',
    "firstUser" TEXT NOT NULL,
    "secondUser" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("requestId")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_firstUser_fkey" FOREIGN KEY ("firstUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_secondUser_fkey" FOREIGN KEY ("secondUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
