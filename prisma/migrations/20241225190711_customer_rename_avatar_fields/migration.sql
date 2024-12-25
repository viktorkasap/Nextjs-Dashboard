/*
  Warnings:

  - You are about to drop the column `avatarData` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "avatarData",
DROP COLUMN "imageUrl",
ADD COLUMN     "avatarFile" BYTEA,
ADD COLUMN     "avatarUrl" TEXT;
