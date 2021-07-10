/*
  Warnings:

  - The primary key for the `DataTable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_tableId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_tableId_fkey";

-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "tableId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DataTable" DROP CONSTRAINT "DataTable_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "DataTable_id_seq";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "tableId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Column" ADD FOREIGN KEY ("tableId") REFERENCES "DataTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("tableId") REFERENCES "DataTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
