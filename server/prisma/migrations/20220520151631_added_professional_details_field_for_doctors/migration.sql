-- CreateTable
CREATE TABLE "ProfessionalDetails" (
    "detailsId" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "medicalDocuments" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProfessionalDetails_pkey" PRIMARY KEY ("detailsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalDetails_userId_key" ON "ProfessionalDetails"("userId");

-- AddForeignKey
ALTER TABLE "ProfessionalDetails" ADD CONSTRAINT "ProfessionalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
