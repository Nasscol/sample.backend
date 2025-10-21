-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_sourceId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
