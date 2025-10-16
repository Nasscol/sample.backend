/*
  Warnings:

  - You are about to drop the column `status` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Issue" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "public"."Status" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);
