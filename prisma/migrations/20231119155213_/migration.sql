/*
  Warnings:

  - A unique constraint covering the columns `[firebaseId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firebaseId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_firebaseId_key" ON "Student"("firebaseId");
