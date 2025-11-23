-- CreateEnum
CREATE TYPE "StatusTugas" AS ENUM ('BELUM', 'PROSES', 'SELESAI');

-- CreateTable
CREATE TABLE "Matkul" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matkul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tugas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "deadline" TIMESTAMP(3),
    "status" "StatusTugas" NOT NULL DEFAULT 'BELUM',
    "matkulId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_matkulId_fkey" FOREIGN KEY ("matkulId") REFERENCES "Matkul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
