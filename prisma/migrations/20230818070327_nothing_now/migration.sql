/*
  Warnings:

  - Made the column `cover` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `cover` VARCHAR(191) NOT NULL;
