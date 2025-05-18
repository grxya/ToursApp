-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshTokenExpiryTime" TIMESTAMP(3),
ALTER COLUMN "refreshToken" DROP NOT NULL;
