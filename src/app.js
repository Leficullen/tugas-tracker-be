// src/app.js
const express = require("express");
const cors = require("cors");

const matkulRoutes = require("./routes/matkulRoutes");
const tugasRoutes = require("./routes/tugasRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const apiKeyMiddleware = require("./middleware/apiKey");

const app = express();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Backend berjalan!" });
});

// Matkul & Tugas pakai API Key
app.use("/matkul", apiKeyMiddleware, matkulRoutes);
app.use("/tugas", apiKeyMiddleware, tugasRoutes);

// Attendance TIDAK pakai API Key
app.use("/attendance", attendanceRoutes);

module.exports = app;
