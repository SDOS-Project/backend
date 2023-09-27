/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firebaseId]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handle]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `Organisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `Organisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "firebaseId" TEXT NOT NULL,
ADD COLUMN     "handle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "handle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_handle_key" ON "Organisation"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_firebaseId_key" ON "Organisation"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_handle_key" ON "Project"("handle");
