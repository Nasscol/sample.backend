/*
  Warnings:

  - Made the column `sourceId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `progressId` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remarksId` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_progressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_remarksId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "sourceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Issue" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "progressId" SET NOT NULL,
ALTER COLUMN "remarksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_remarksId_fkey" FOREIGN KEY ("remarksId") REFERENCES "public"."Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "public"."Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
