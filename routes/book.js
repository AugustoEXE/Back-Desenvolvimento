const express = require("express");
const { auth } = require("../middlewares/auth.js");
const bookController = require("../controllers/bookController");
const router = express.Router();
const multer = require("multer");
const storage = require("../funcs/multer.config.js");
const upload = multer({ storage });

router.get("/books", async (req, res) => {
    const data = req.query;
    // console.log(data.author);
    const books = await bookController.list(data);
    res.json(books);
});

router.post("/book", upload.single("file"), (req, res) => {
    console.log(req.body);
    const newBook = bookController.create({
        body: req.body,
        files: req.file,
    });
    return res.json(newBook);
});
router.delete("/book/del/:id", async (req, res) => {
    const { id } = req.params;
    const deletedBook = await bookController.delete(parseInt(id));
    res.json(deletedBook);
});

router.put("/book/:id", async (req, res) => {
    const { id } = req.params;
    const alteredBook = await bookController.alter(parseInt(id), req.body);
    res.json(alteredBook);
});
module.exports = router;
