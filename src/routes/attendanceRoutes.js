const { postPresent, createIzin, getMonth, postBolos } = require("../controllers/attendanceController");

const express = require("express");

const router = express.Router();

// POST /attendance/present
router.post("/attendance/present", postPresent);

// POST /attendance/izin
router.post("/attendance/izin", createIzin);

//GET /attendance/month
router.get("/attendance/month", getMonth);

//POST /attendance/autobolos
router.post("/attendance/autobolos", postBolos);

module.exports = router;
