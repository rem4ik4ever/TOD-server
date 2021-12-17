-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "price" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_unique" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
