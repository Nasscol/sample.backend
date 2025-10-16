-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
