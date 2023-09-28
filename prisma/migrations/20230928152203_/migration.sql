/*
  Warnings:

  - Added the required column `ipPolicy` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "ipPolicy" TEXT NOT NULL;
