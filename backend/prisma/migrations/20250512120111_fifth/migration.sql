/*
  Warnings:

  - You are about to drop the column `countryId` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the `_CustomizedTourExcursions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TourExcursions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `Excursion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_countryId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomizedTourExcursions" DROP CONSTRAINT "_CustomizedTourExcursions_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomizedTourExcursions" DROP CONSTRAINT "_CustomizedTourExcursions_B_fkey";

-- DropForeignKey
ALTER TABLE "_TourExcursions" DROP CONSTRAINT "_TourExcursions_A_fkey";

-- DropForeignKey
ALTER TABLE "_TourExcursions" DROP CONSTRAINT "_TourExcursions_B_fkey";

-- AlterTable
ALTER TABLE "Excursion" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "countryId";

-- DropTable
DROP TABLE "_CustomizedTourExcursions";

-- DropTable
DROP TABLE "_TourExcursions";

-- CreateTable
CREATE TABLE "ExcursionOnTour" (
    "tourId" TEXT NOT NULL,
    "excursionId" TEXT NOT NULL,

    CONSTRAINT "ExcursionOnTour_pkey" PRIMARY KEY ("tourId","excursionId")
);

-- CreateTable
CREATE TABLE "ExcursionOnCustomizedTour" (
    "tourId" TEXT NOT NULL,
    "excursionId" TEXT NOT NULL,

    CONSTRAINT "ExcursionOnCustomizedTour_pkey" PRIMARY KEY ("tourId","excursionId")
);

-- AddForeignKey
ALTER TABLE "Excursion" ADD CONSTRAINT "Excursion_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcursionOnTour" ADD CONSTRAINT "ExcursionOnTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcursionOnTour" ADD CONSTRAINT "ExcursionOnTour_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "Excursion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcursionOnCustomizedTour" ADD CONSTRAINT "ExcursionOnCustomizedTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "CustomizedTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcursionOnCustomizedTour" ADD CONSTRAINT "ExcursionOnCustomizedTour_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "Excursion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
