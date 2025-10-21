-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_sourceId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "sourceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Issue" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
