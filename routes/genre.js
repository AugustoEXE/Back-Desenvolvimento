const express = require("express");
const genreController = require("../controllers/genreController");
const router = express.Router();

router.get("/genres", async (req, res) => {
  const genres = await genreController.list();
  res.json(genres);
});
router.post("/genre", async (req, res) => {
  const newGenre = await genreController.create(req.body);
  res.json(newGenre);
});
router.delete("/genre/:id", async (req, res) => {
  const { id } = req.params;
  const deletedGenre = await genreController.delete(parseInt(id));
  res.json(deletedGenre);
});

router.put("/genre/:id", async (req, res) => {
  const { id } = req.params;
  const alteredGenre = await genreController.alter(parseInt(id), req.body);
  res.json(alteredGenre);
});
module.exports = router;
