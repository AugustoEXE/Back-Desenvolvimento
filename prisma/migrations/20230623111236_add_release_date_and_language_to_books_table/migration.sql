/*
  Warnings:

  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `release_date` DATETIME(3) NOT NULL;
