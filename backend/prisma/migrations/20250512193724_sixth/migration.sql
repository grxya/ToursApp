/*
  Warnings:

  - Added the required column `countryId` to the `CustomizedTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomizedTour" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomizedTour" ADD CONSTRAINT "CustomizedTour_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
