/*
  Warnings:

  - Added the required column `userId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Issue" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
