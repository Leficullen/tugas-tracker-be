const express = require("express");
const router = express.Router();
const {
  getAllMatkul,
  createMatkul,
  updateMatkul,
  deleteMatkul,
} = require("../controllers/matkulController");

// GET semua matkul
router.get("/", getAllMatkul);

// POST membuat matkul baru
router.post("/", createMatkul);

// PUT update matkul
router.put("/:id", updateMatkul);

// DELETE matkul
router.delete("/:id", deleteMatkul);

module.exports = router;
