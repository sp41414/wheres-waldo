/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Characters` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "time_taken" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");
