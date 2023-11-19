-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organisationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "areasOfInterest" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "imgUrl" DROP NOT NULL,
ALTER COLUMN "organisationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
