const prisma = require("../db/prisma");

async function getAllTugas(req, res) {
  try {
    const data = await prisma.tugas.findMany({
      orderBy: { id: "asc" },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gagal mengambil tugas" });
  }
}

async function createTugas(req, res) {
  const { nama, deskripsi, status, deadline, matkulId } = req.body;

  try {
    const created = await prisma.tugas.create({
      data: {
        nama,
        deskripsi,
        status,
        matkulId: Number(matkulId),
        deadline: deadline ? new Date(deadline) : null,
      },
    });
    res.json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gagal membuat tugas" });
  }
}

async function updateTugas(req, res) {
  const { id } = req.params;
  const { nama, deskripsi, status, deadline, matkulId } = req.body;

  try {
    const updated = await prisma.tugas.update({
      where: { id: Number(id) },
      data: {
        nama,
        deskripsi,
        status,
        matkulId: Number(matkulId),
        deadline: deadline ? new Date(deadline) : null,
      },
    });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gagal update tugas" });
  }
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.tugas.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gagal update status" });
  }
}

async function deleteTugas(req, res) {
  const { id } = req.params;

  try {
    await prisma.tugas.delete({ where: { id: Number(id) } });
    res.json({ message: "Tugas dihapus" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gagal menghapus tugas" });
  }
}

module.exports = {
  getAllTugas,
  createTugas,
  updateTugas,
  updateStatus,
  deleteTugas,
};
