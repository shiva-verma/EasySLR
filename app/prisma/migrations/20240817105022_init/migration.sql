/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_description_key" ON "tasks"("description");
