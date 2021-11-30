/*
  Warnings:

  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FieldValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_tableId_fkey";

-- DropForeignKey
ALTER TABLE "DataTable" DROP CONSTRAINT "DataTable_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_tableId_fkey";

-- DropForeignKey
ALTER TABLE "FieldValue" DROP CONSTRAINT "FieldValue_columnId_fkey";

-- DropForeignKey
ALTER TABLE "FieldValue" DROP CONSTRAINT "FieldValue_entryId_fkey";

-- DropTable
DROP TABLE "Column";

-- DropTable
DROP TABLE "DataTable";

-- DropTable
DROP TABLE "Entry";

-- DropTable
DROP TABLE "FieldValue";
