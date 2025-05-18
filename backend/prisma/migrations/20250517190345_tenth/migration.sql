/*
  Warnings:

  - You are about to drop the column `customizedTourId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `excursionId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `peopleCount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `tourId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameAz]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameRu]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameJa]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameAz]` on the table `Excursion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameRu]` on the table `Excursion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameJa]` on the table `Excursion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameAz]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameRu]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameJa]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descriptionAz` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionJa` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionRu` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAz` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJa` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRu` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionAz` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionJa` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionRu` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAz` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJa` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRu` to the `Excursion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionAz` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionJa` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionRu` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAz` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJa` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRu` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PAID_ONLINE', 'PAY_ON_ARRIVAL');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customizedTourId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_excursionId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tourId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "customizedTourId",
DROP COLUMN "excursionId",
DROP COLUMN "peopleCount",
DROP COLUMN "tourId",
ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'PAY_ON_ARRIVAL';

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "descriptionAz" TEXT NOT NULL,
ADD COLUMN     "descriptionJa" TEXT NOT NULL,
ADD COLUMN     "descriptionRu" TEXT NOT NULL,
ADD COLUMN     "nameAz" TEXT NOT NULL,
ADD COLUMN     "nameJa" TEXT NOT NULL,
ADD COLUMN     "nameRu" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Excursion" ADD COLUMN     "descriptionAz" TEXT NOT NULL,
ADD COLUMN     "descriptionJa" TEXT NOT NULL,
ADD COLUMN     "descriptionRu" TEXT NOT NULL,
ADD COLUMN     "nameAz" TEXT NOT NULL,
ADD COLUMN     "nameJa" TEXT NOT NULL,
ADD COLUMN     "nameRu" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "descriptionAz" TEXT NOT NULL,
ADD COLUMN     "descriptionJa" TEXT NOT NULL,
ADD COLUMN     "descriptionRu" TEXT NOT NULL,
ADD COLUMN     "nameAz" TEXT NOT NULL,
ADD COLUMN     "nameJa" TEXT NOT NULL,
ADD COLUMN     "nameRu" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BookingItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(10,2) NOT NULL,
    "bookingId" TEXT NOT NULL,
    "tourId" TEXT,
    "customizedTourId" TEXT,
    "excursionId" TEXT,

    CONSTRAINT "BookingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tourId" TEXT,
    "customizedTourId" TEXT,
    "excursionId" TEXT,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_nameAz_key" ON "Country"("nameAz");

-- CreateIndex
CREATE UNIQUE INDEX "Country_nameRu_key" ON "Country"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Country_nameJa_key" ON "Country"("nameJa");

-- CreateIndex
CREATE UNIQUE INDEX "Excursion_nameAz_key" ON "Excursion"("nameAz");

-- CreateIndex
CREATE UNIQUE INDEX "Excursion_nameRu_key" ON "Excursion"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Excursion_nameJa_key" ON "Excursion"("nameJa");

-- CreateIndex
CREATE UNIQUE INDEX "Tour_nameAz_key" ON "Tour"("nameAz");

-- CreateIndex
CREATE UNIQUE INDEX "Tour_nameRu_key" ON "Tour"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Tour_nameJa_key" ON "Tour"("nameJa");

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_customizedTourId_fkey" FOREIGN KEY ("customizedTourId") REFERENCES "CustomizedTour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "Excursion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_customizedTourId_fkey" FOREIGN KEY ("customizedTourId") REFERENCES "CustomizedTour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "Excursion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
