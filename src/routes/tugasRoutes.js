const express = require("express");
const router = express.Router();
const {
  getAllTugas,
  createTugas,
  updateTugas,
  updateStatus,
  deleteTugas,
} = require("../controllers/tugasController");

router.get("/", getAllTugas);
router.post("/", createTugas);
router.put("/:id", updateTugas);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteTugas);

module.exports = router;
