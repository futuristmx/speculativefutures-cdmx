-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RolContribucion" AS ENUM ('regular', 'curador_comunidad', 'curador_core');

-- CreateEnum
CREATE TYPE "EstadoMiembro" AS ENUM ('activo', 'inactivo');

-- CreateEnum
CREATE TYPE "TipoSenial" AS ENUM ('tendencia', 'anomalia', 'contradiccion', 'hack', 'extremo', 'debilidad');

-- CreateEnum
CREATE TYPE "EstadoSenial" AS ENUM ('borrador', 'en_revision', 'aprobada', 'rechazada', 'publicada');

-- CreateEnum
CREATE TYPE "HorizonteTemporal" AS ENUM ('ahora', 'emergente', 'mediano', 'largo', 'horizonte');

-- CreateEnum
CREATE TYPE "DecisionRevision" AS ENUM ('aprobada', 'rechazada', 'requiere_edicion');

-- CreateEnum
CREATE TYPE "ModalidadEvento" AS ENUM ('online', 'presencial', 'hibrido');

-- CreateEnum
CREATE TYPE "EstadoEvento" AS ENUM ('borrador', 'programado', 'lleno', 'en_curso', 'realizado', 'cancelado', 'pospuesto');

-- CreateEnum
CREATE TYPE "EstadoRSVP" AS ENUM ('registrado', 'asistio', 'no_asistio');

-- CreateEnum
CREATE TYPE "TipoPieza" AS ENUM ('ensayo', 'dossier', 'reporte', 'briefing');

-- CreateEnum
CREATE TYPE "EstadoPieza" AS ENUM ('borrador', 'publicada');

-- CreateEnum
CREATE TYPE "TipoAliado" AS ENUM ('academia', 'cultural', 'consultora', 'fundacion');

-- CreateEnum
CREATE TYPE "RolAliado" AS ENUM ('editorial', 'eventos', 'financiero', 'intelectual');

-- CreateEnum
CREATE TYPE "TipoRelacion" AS ENUM ('convergencia', 'contradiccion', 'derivacion', 'referencia');

-- CreateEnum
CREATE TYPE "EntidadTipo" AS ENUM ('senial', 'evento', 'pieza_editorial');

-- CreateEnum
CREATE TYPE "EstadoSuscripcion" AS ENUM ('activa', 'pausada', 'cancelada');

-- CreateTable
CREATE TABLE "capitulo" (
    "id" UUID NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "ciudad" TEXT,
    "pais" TEXT DEFAULT 'México',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capitulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "miembro" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "disciplina" TEXT,
    "motivacion" TEXT,
    "bio_corta" TEXT,
    "enlaces_externos" JSONB,
    "rol_contribucion" "RolContribucion" NOT NULL DEFAULT 'regular',
    "seniales_publicadas_aprobadas" INTEGER NOT NULL DEFAULT 0,
    "onboarding_completado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_ultima_publicacion_aprobada" TIMESTAMP(3),
    "estado" "EstadoMiembro" NOT NULL DEFAULT 'activo',
    "aliado_fundador_id" UUID,
    "rol_en_aliado" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "miembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "territorio" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "territorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "senial" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fuente_url" TEXT,
    "fuente_descripcion" TEXT,
    "territorio_id" UUID NOT NULL,
    "curador_id" UUID NOT NULL,
    "tipo" "TipoSenial" NOT NULL,
    "horizonte_temporal" "HorizonteTemporal",
    "interpretacion_estrategica" TEXT,
    "estado" "EstadoSenial" NOT NULL DEFAULT 'borrador',
    "idiomas" TEXT[] DEFAULT ARRAY['es']::TEXT[],
    "auditada" BOOLEAN NOT NULL DEFAULT false,
    "fecha_captura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_publicacion" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "senial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revision_senial" (
    "id" UUID NOT NULL,
    "senial_id" UUID NOT NULL,
    "revisor_id" UUID NOT NULL,
    "estado" "DecisionRevision" NOT NULL,
    "comentario_editorial" TEXT,
    "ronda" INTEGER NOT NULL DEFAULT 1,
    "fecha_revision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revision_senial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "territorio_id" UUID,
    "modalidad" "ModalidadEvento" NOT NULL,
    "estado" "EstadoEvento" NOT NULL DEFAULT 'borrador',
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "ubicacion" TEXT,
    "capacidad" INTEGER,
    "idiomas" TEXT[] DEFAULT ARRAY['es']::TEXT[],
    "ponentes" JSONB,
    "recursos_post_evento" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvp" (
    "id" UUID NOT NULL,
    "miembro_id" UUID NOT NULL,
    "evento_id" UUID NOT NULL,
    "estado" "EstadoRSVP" NOT NULL DEFAULT 'registrado',
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pieza_editorial" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "tipo" "TipoPieza" NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "autor_id" UUID NOT NULL,
    "territorio_id" UUID,
    "estado" "EstadoPieza" NOT NULL DEFAULT 'borrador',
    "idiomas" TEXT[] DEFAULT ARRAY['es']::TEXT[],
    "acceso_premium" BOOLEAN NOT NULL DEFAULT false,
    "fecha_publicacion" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pieza_editorial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aliado_fundador" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "logo" TEXT,
    "descripcion_corta" TEXT,
    "tipo" "TipoAliado" NOT NULL,
    "rol_especifico" "RolAliado" NOT NULL,
    "link" TEXT,
    "fecha_incorporacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aliado_fundador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conexion" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "entidad_origen_tipo" "EntidadTipo" NOT NULL,
    "entidad_origen_id" UUID NOT NULL,
    "entidad_destino_tipo" "EntidadTipo" NOT NULL,
    "entidad_destino_id" UUID NOT NULL,
    "tipo_relacion" "TipoRelacion" NOT NULL,
    "nota" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conexion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio_mxn" DECIMAL(10,2),
    "intervalo" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suscripcion" (
    "id" UUID NOT NULL,
    "miembro_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "estado" "EstadoSuscripcion" NOT NULL DEFAULT 'cancelada',
    "fecha_inicio" TIMESTAMP(3),
    "fecha_fin" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsor" (
    "id" UUID NOT NULL,
    "capitulo_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "logo" TEXT,
    "link" TEXT,
    "tipo" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MiembroTerritorios" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MiembroTerritorios_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventoSenalesDiscutidas" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_EventoSenalesDiscutidas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PiezaSenalesReferenciadas" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PiezaSenalesReferenciadas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "capitulo_codigo_key" ON "capitulo"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "miembro_user_id_key" ON "miembro"("user_id");

-- CreateIndex
CREATE INDEX "miembro_rol_contribucion_idx" ON "miembro"("rol_contribucion");

-- CreateIndex
CREATE INDEX "miembro_capitulo_id_idx" ON "miembro"("capitulo_id");

-- CreateIndex
CREATE UNIQUE INDEX "miembro_capitulo_id_email_key" ON "miembro"("capitulo_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "territorio_capitulo_id_codigo_key" ON "territorio"("capitulo_id", "codigo");

-- CreateIndex
CREATE INDEX "senial_capitulo_id_idx" ON "senial"("capitulo_id");

-- CreateIndex
CREATE INDEX "senial_territorio_id_idx" ON "senial"("territorio_id");

-- CreateIndex
CREATE INDEX "senial_estado_idx" ON "senial"("estado");

-- CreateIndex
CREATE INDEX "senial_curador_id_idx" ON "senial"("curador_id");

-- CreateIndex
CREATE INDEX "senial_fecha_publicacion_idx" ON "senial"("fecha_publicacion");

-- CreateIndex
CREATE INDEX "revision_senial_senial_id_idx" ON "revision_senial"("senial_id");

-- CreateIndex
CREATE INDEX "revision_senial_estado_idx" ON "revision_senial"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "revision_senial_senial_id_ronda_key" ON "revision_senial"("senial_id", "ronda");

-- CreateIndex
CREATE INDEX "evento_capitulo_id_idx" ON "evento"("capitulo_id");

-- CreateIndex
CREATE INDEX "evento_fecha_inicio_idx" ON "evento"("fecha_inicio");

-- CreateIndex
CREATE INDEX "evento_estado_idx" ON "evento"("estado");

-- CreateIndex
CREATE INDEX "rsvp_evento_id_idx" ON "rsvp"("evento_id");

-- CreateIndex
CREATE UNIQUE INDEX "rsvp_miembro_id_evento_id_key" ON "rsvp"("miembro_id", "evento_id");

-- CreateIndex
CREATE INDEX "pieza_editorial_capitulo_id_idx" ON "pieza_editorial"("capitulo_id");

-- CreateIndex
CREATE INDEX "pieza_editorial_tipo_idx" ON "pieza_editorial"("tipo");

-- CreateIndex
CREATE INDEX "pieza_editorial_fecha_publicacion_idx" ON "pieza_editorial"("fecha_publicacion");

-- CreateIndex
CREATE INDEX "aliado_fundador_capitulo_id_idx" ON "aliado_fundador"("capitulo_id");

-- CreateIndex
CREATE INDEX "conexion_entidad_origen_tipo_entidad_origen_id_idx" ON "conexion"("entidad_origen_tipo", "entidad_origen_id");

-- CreateIndex
CREATE INDEX "conexion_entidad_destino_tipo_entidad_destino_id_idx" ON "conexion"("entidad_destino_tipo", "entidad_destino_id");

-- CreateIndex
CREATE INDEX "conexion_capitulo_id_idx" ON "conexion"("capitulo_id");

-- CreateIndex
CREATE INDEX "suscripcion_miembro_id_idx" ON "suscripcion"("miembro_id");

-- CreateIndex
CREATE INDEX "sponsor_capitulo_id_idx" ON "sponsor"("capitulo_id");

-- CreateIndex
CREATE INDEX "_MiembroTerritorios_B_index" ON "_MiembroTerritorios"("B");

-- CreateIndex
CREATE INDEX "_EventoSenalesDiscutidas_B_index" ON "_EventoSenalesDiscutidas"("B");

-- CreateIndex
CREATE INDEX "_PiezaSenalesReferenciadas_B_index" ON "_PiezaSenalesReferenciadas"("B");

-- AddForeignKey
ALTER TABLE "miembro" ADD CONSTRAINT "miembro_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembro" ADD CONSTRAINT "miembro_aliado_fundador_id_fkey" FOREIGN KEY ("aliado_fundador_id") REFERENCES "aliado_fundador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "territorio" ADD CONSTRAINT "territorio_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "senial" ADD CONSTRAINT "senial_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "senial" ADD CONSTRAINT "senial_territorio_id_fkey" FOREIGN KEY ("territorio_id") REFERENCES "territorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "senial" ADD CONSTRAINT "senial_curador_id_fkey" FOREIGN KEY ("curador_id") REFERENCES "miembro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revision_senial" ADD CONSTRAINT "revision_senial_senial_id_fkey" FOREIGN KEY ("senial_id") REFERENCES "senial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revision_senial" ADD CONSTRAINT "revision_senial_revisor_id_fkey" FOREIGN KEY ("revisor_id") REFERENCES "miembro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_territorio_id_fkey" FOREIGN KEY ("territorio_id") REFERENCES "territorio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_miembro_id_fkey" FOREIGN KEY ("miembro_id") REFERENCES "miembro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieza_editorial" ADD CONSTRAINT "pieza_editorial_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieza_editorial" ADD CONSTRAINT "pieza_editorial_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "miembro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieza_editorial" ADD CONSTRAINT "pieza_editorial_territorio_id_fkey" FOREIGN KEY ("territorio_id") REFERENCES "territorio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aliado_fundador" ADD CONSTRAINT "aliado_fundador_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "suscripcion_miembro_id_fkey" FOREIGN KEY ("miembro_id") REFERENCES "miembro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "suscripcion_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsor" ADD CONSTRAINT "sponsor_capitulo_id_fkey" FOREIGN KEY ("capitulo_id") REFERENCES "capitulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiembroTerritorios" ADD CONSTRAINT "_MiembroTerritorios_A_fkey" FOREIGN KEY ("A") REFERENCES "miembro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiembroTerritorios" ADD CONSTRAINT "_MiembroTerritorios_B_fkey" FOREIGN KEY ("B") REFERENCES "territorio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoSenalesDiscutidas" ADD CONSTRAINT "_EventoSenalesDiscutidas_A_fkey" FOREIGN KEY ("A") REFERENCES "evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoSenalesDiscutidas" ADD CONSTRAINT "_EventoSenalesDiscutidas_B_fkey" FOREIGN KEY ("B") REFERENCES "senial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PiezaSenalesReferenciadas" ADD CONSTRAINT "_PiezaSenalesReferenciadas_A_fkey" FOREIGN KEY ("A") REFERENCES "pieza_editorial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PiezaSenalesReferenciadas" ADD CONSTRAINT "_PiezaSenalesReferenciadas_B_fkey" FOREIGN KEY ("B") REFERENCES "senial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

