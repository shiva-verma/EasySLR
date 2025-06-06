/*
  Warnings:

  - You are about to drop the column `project_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "project_id";

-- DropTable
DROP TABLE "projects";
