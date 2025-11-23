/*
  Warnings:

  - The values [PROSES] on the enum `StatusTugas` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTugas_new" AS ENUM ('BELUM', 'SELESAI', 'EXPIRED');
ALTER TABLE "Tugas" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tugas" ALTER COLUMN "status" TYPE "StatusTugas_new" USING ("status"::text::"StatusTugas_new");
ALTER TYPE "StatusTugas" RENAME TO "StatusTugas_old";
ALTER TYPE "StatusTugas_new" RENAME TO "StatusTugas";
DROP TYPE "StatusTugas_old";
ALTER TABLE "Tugas" ALTER COLUMN "status" SET DEFAULT 'BELUM';
COMMIT;
