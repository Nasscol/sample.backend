-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "sourceId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
