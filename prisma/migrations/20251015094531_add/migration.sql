-- AlterTable
ALTER TABLE "public"."Issue" ADD COLUMN     "progressId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "public"."Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
