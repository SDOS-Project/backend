/*
  Warnings:

  - You are about to drop the column `organisationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectOrganisations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectOrganisations" DROP CONSTRAINT "_ProjectOrganisations_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectOrganisations" DROP CONSTRAINT "_ProjectOrganisations_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "organisationId";

-- DropTable
DROP TABLE "Organisation";

-- DropTable
DROP TABLE "_ProjectOrganisations";
