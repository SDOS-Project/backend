/*
  Warnings:

  - Added the required column `password` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "password" TEXT NOT NULL;
