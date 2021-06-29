/*
  Warnings:

  - Added the required column `columnId` to the `FieldValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FieldValue" ADD COLUMN     "columnId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FieldValue" ADD FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
