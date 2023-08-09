-- AlterTable
ALTER TABLE `book` ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `admin` DROP DEFAULT;

-- CreateTable
CREATE TABLE `BookedBooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `book_id` INTEGER NOT NULL,
    `bookedDate` DATETIME(3) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookedBooks` ADD CONSTRAINT `BookedBooks_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookedBooks` ADD CONSTRAINT `BookedBooks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
