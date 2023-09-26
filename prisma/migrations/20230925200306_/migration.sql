/*
  Warnings:

  - The values [DISABLED] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[handle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firebaseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firebaseId" TEXT NOT NULL,
ADD COLUMN     "handle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseId_key" ON "User"("firebaseId");
