-- AlterTable
ALTER TABLE `book` ADD COLUMN `cover` VARCHAR(191) NULL,
    MODIFY `release_date` DATETIME(3) NULL;
