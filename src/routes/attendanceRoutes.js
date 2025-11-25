const { postPresent, createIzin, getMonth, postBolos } = require("../controllers/attendanceController");

const express = require("express");

const router = express.Router();

// POST /attendance/present
router.post("/present", postPresent);

// POST /attendance/izin
router.post("/izin", createIzin);

//GET /attendance/month
router.get("/month", getMonth);

//POST /attendance/autobolos
router.post("/autobolos", postBolos);

module.exports = router;
