/*
  Warnings:

  - Added the required column `refreshTokenExpiryTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshTokenExpiryTime",
ADD COLUMN     "refreshTokenExpiryTime" INTEGER NOT NULL;
