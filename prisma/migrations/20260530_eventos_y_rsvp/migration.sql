-- AlterEnum
ALTER TYPE "EstadoRSVP" ADD VALUE 'cancelado';

-- AlterTable
ALTER TABLE "evento" DROP COLUMN "ubicacion",
ADD COLUMN     "ubicacion" JSONB;

-- AlterTable
ALTER TABLE "rsvp" ADD COLUMN     "fecha_cancelacion" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "rsvp_estado_idx" ON "rsvp"("estado");

