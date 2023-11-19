/*
  Warnings:

  - Made the column `students` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "students" SET NOT NULL;
