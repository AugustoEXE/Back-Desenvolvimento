const express = require("express");
const { auth } = require("../middlewares/auth.js");

const router = express.Router();

const bookedBooksController = require("../controllers/bookedBooksController");

router.post("/bookedBooks", auth, async (req, res) => {
    const bookedBook = await bookedBooksController.create(req.body);
    res.json(bookedBook);
});

router.get("/user/books", auth, async (req, res) => {
    console.log(req.payLoad);
    const result = await bookedBooksController.bookedUserBooks(parseInt(id));
    res.json(result);
});

router.put("/alter/");

module.exports = router;
