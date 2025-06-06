/*
  Warnings:

  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropIndex
DROP INDEX "profiles_userId_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "userId",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_email_key" ON "profiles"("user_email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
