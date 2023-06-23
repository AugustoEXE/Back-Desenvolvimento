const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.get("/books", async (req, res) => {
  const books = await bookController.list();
  console.log(books)
  res.json(books);
});
router.post("/book", async (req, res) => {
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
