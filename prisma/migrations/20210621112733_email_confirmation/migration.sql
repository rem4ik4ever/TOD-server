-- CreateTable
CREATE TABLE "EmailConfirmation" (
    "id" SERIAL NOT NULL,
    "confirmationToken" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirmation_userId_unique" ON "EmailConfirmation"("userId");

-- AddForeignKey
ALTER TABLE "EmailConfirmation" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
