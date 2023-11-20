/*
  Warnings:

  - Changed the type of `discipline` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('CivilEngineering', 'MechanicalEngineering', 'ElectricalEngineering', 'ComputerScienceAndEngineering', 'AerospaceEngineering', 'ChemicalEngineering', 'BiomedicalEngineering', 'CivilAndEnvironmentalEngineering', 'MaterialsScienceAndEngineering', 'AutomobileEngineering', 'Mechatronics', 'TextileEngineering', 'OceanEngineering');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discipline",
ADD COLUMN     "discipline" "Discipline" NOT NULL;
