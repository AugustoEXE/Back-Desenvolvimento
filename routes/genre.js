const express = require("express");
const genreController = require("../controllers/genreController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/genres", async (req, res) => {
  const genres = await genreController.list();
  res.json(genres);
});
router.post("/genre",auth, async (req, res) => {
  const newGenre = await genreController.create(req.body);
  return res.json(newGenre);
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
