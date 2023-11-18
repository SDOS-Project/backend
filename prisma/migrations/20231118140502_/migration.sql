/*
  Warnings:

  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" "Location" NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
