const express = require("express");
const { auth } = require("../middlewares/auth.js");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.get("/books", async (req, res) => {
    const data = req.query;
    console.log(data.author);
    const books = await bookController.list(data);
    res.json(books);
});

router.post("/book", auth, async (req, res) => {
    const newBook = await bookController.create(req.body);
    res.json(newBook);
});
router.delete("/book/:id", async (req, res) => {
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
