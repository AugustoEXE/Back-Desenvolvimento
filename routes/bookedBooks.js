const express = require("express");
const { auth } = require("../middlewares/auth");
const books = require("../controllers/bookController");

const router = express.Router();

const bookedBooksController = require("../controllers/bookedBooksController");

router.post("/bookedBooks", auth, async (req, res) => {
    const { book_id, bookedDate, active, available } = req.body;
    const { id } = req.payload;
    const bookedBook = await bookedBooksController.create({
        book_id,
        bookedDate,
        user_id: id,
        active,
        available,
    });
    await bookedBooksController.changeBookedStatus(active, id);
    await books.bookBooks(available, id);
    res.json(bookedBook);
});

router.get("/user/books", auth, async (req, res) => {
    // console.log(req.payload.name);
    const result = await bookedBooksController.bookedUserBooks(req.payload.id);
    res.json(result);
});

module.exports = router;
