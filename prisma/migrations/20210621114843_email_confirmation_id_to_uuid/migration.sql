/*
  Warnings:

  - The primary key for the `EmailConfirmation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `confirmationToken` on the `EmailConfirmation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP CONSTRAINT "EmailConfirmation_pkey",
DROP COLUMN "confirmationToken",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "EmailConfirmation_id_seq";
