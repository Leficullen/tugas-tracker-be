const prisma = require("../db/prisma");

// ENV (ganti di Railway)
const FASILKOM_LAT = parseFloat(process.env.FASILKOM_LAT || "-6.3625");
const FASILKOM_LNG = parseFloat(process.env.FASILKOM_LNG || "106.8245");
const PRESENCE_RADIUS_M = parseInt(process.env.PRESENCE_RADIUS_M || "50", 10);

// Helper: ambil "yyyy-mm-dd" (tanpa jam)
function getTodayDateOnly() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// POST /attendance/present
async function postPresent(req, res) {
  try {
    const { userId, lat, lng } = req.body;

    if (!userId || lat == null || lng == null) {
      return res.status(400).json({ message: "userId, lat, lng wajib diisi" });
    }

    const distance = getDistanceMeters(
      Number(lat),
      Number(lng),
      FASILKOM_LAT,
      FASILKOM_LNG
    );

    if (distance > PRESENCE_RADIUS_M) {
      return res.status(403).json({
        message: "Anda berada di luar area Fasilkom",
        distance,
      });
    }

    const todayStr = getTodayDateOnly();
    const todayDate = new Date(todayStr);

    await prisma.attendance.upsert({
      where: {
        userId_date: {
          userId,
          date: todayDate,
        },
      },
      update: {
        status: "HADIR",
        reason: null,
      },
      create: {
        userId,
        date: todayDate,
        status: "HADIR",
      },
    });

    res.json({ message: "Presensi berhasil", distance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function createIzin(req, res) {
  try {
    const { userId, reason } = req.body;
    if (!userId || !reason) {
      return res.status(400).json({ message: "userId dan reason wajib diisi" });
    }

    const todayStr = getTodayDateOnly();
    const todayDate = new Date(todayStr);

    await prisma.attendance.upsert({
      where: {
        userId_date: {
          userId,
          date: todayDate,
        },
      },
      update: {
        status: "IZIN",
        reason,
      },
      create: {
        userId,
        date: todayDate,
        status: "IZIN",
        reason,
      },
    });

    res.json({ message: "Izin sudah dicatat" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getMonth(req, res) {
  try {
    const userId = req.query.userId;
    const month = req.query.month; // format yyyy-mm

    if (!userId || !month) {
      return res.status(400).json({ message: "Missing queries" });
    }

    const [year, m] = month.split("-").map(Number);

    const start = new Date(Date.UTC(year, m - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, m, 1, 0, 0, 0));
    console.log("DEBUG GET MONTH:", {
      userId,
      month,
      start,
      end,
    });

    const data = await prisma.attendance.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { date: "asc" },
    });

    res.json(data);
  } catch (err) {
    console.error("MONTH ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function postBolos(req, res) {
  try {
    // kemarin
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const yStr = `${year}-${month}-${day}`;
    const yesterday = new Date(yStr);

    // Insert BOLOS untuk user yang belum punya record di tanggal kemarin
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Attendance"("id", "userId", "date", "status", "createdAt", "updatedAt")
      SELECT gen_random_uuid(), u.id, '${yStr}'::date, 'BOLOS', NOW(), NOW()
      FROM "User" u
      WHERE NOT EXISTS (
        SELECT 1 FROM "Attendance" a
        WHERE a."userId" = u.id
          AND a."date" = '${yStr}'::date
      );
    `);

    res.json({ message: "Auto bolos executed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  postPresent,
  createIzin,
  getMonth,
  postBolos,
};

