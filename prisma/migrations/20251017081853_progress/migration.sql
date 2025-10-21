-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_progressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_remarksId_fkey";

-- AlterTable
ALTER TABLE "public"."Issue" ALTER COLUMN "progressId" DROP NOT NULL,
ALTER COLUMN "remarksId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_remarksId_fkey" FOREIGN KEY ("remarksId") REFERENCES "public"."Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "public"."Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
