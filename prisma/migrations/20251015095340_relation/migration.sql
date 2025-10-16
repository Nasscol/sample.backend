-- AlterTable
ALTER TABLE "public"."Issue" ADD COLUMN     "remarksId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_remarksId_fkey" FOREIGN KEY ("remarksId") REFERENCES "public"."Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
