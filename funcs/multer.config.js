const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, call) => {
        call(null, path.resolve("uploads"));
    },
    filename: (req, file, call) => {
        const time = new Date().getTime();

        call(null, `${time}_${file.originalname}`);
    },
});

module.exports = storage;
