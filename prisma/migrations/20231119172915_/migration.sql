/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organisationName" TEXT;

-- DropTable
DROP TABLE "Student";
