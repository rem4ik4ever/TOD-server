-- AlterTable
ALTER TABLE "DataTable" ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "DataTable" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
