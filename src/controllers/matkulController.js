const prisma = require("../db/prisma");

// GET semua matkul
async function getAllMatkul(req, res) {
  try {
    const data = await prisma.matkul.findMany({
      include: { tugas: true },
      orderBy: { id: "asc" },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data matkul" });
  }
}

// Controller
//    handle method (GET, POST, UPDATE, DELETE)
//        validasi data, check auth
//        service (logic)

// CREATE matkul
async function createMatkul(req, res) {
  const { nama, sks, deskripsi } = req.body;

  try {
    const created = await prisma.matkul.create({
      data: {
        nama,
        sks: Number(sks),
        deskripsi: deskripsi || null,
      },
    });

    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal membuat matkul" });
  }
}

// UPDATE matkul
async function updateMatkul(req, res) {
  const { id } = req.params;
  const { nama, sks, deskripsi } = req.body;

  try {
    const updated = await prisma.matkul.update({
      where: { id: Number(id) },
      data: { nama, sks: Number(sks), deskripsi },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update matkul" });
  }
}

// DELETE matkul
async function deleteMatkul(req, res) {
  const { id } = req.params;

  try {
    await prisma.tugas.deleteMany({ where: { matkulId: Number(id) } });
    await prisma.matkul.delete({ where: { id: Number(id) } });

    res.json({ message: "Matkul dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus matkul" });
  }
}

module.exports = {
  getAllMatkul,
  createMatkul,
  updateMatkul,
  deleteMatkul,
};
