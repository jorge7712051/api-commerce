-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'AUXILIAR');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comerciante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "telefono" TEXT,
    "correoElectronico" TEXT,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Estado" NOT NULL,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,
    "usuarioActualizacionId" INTEGER NOT NULL,

    CONSTRAINT "Comerciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Establecimiento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ingresos" DECIMAL(10,2) NOT NULL,
    "numeroEmpleados" INTEGER NOT NULL,
    "comercianteId" INTEGER NOT NULL,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,
    "usuarioActualizacionId" INTEGER NOT NULL,

    CONSTRAINT "Establecimiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correoElectronico_key" ON "Usuario"("correoElectronico");

-- AddForeignKey
ALTER TABLE "Comerciante" ADD CONSTRAINT "Comerciante_usuarioActualizacionId_fkey" FOREIGN KEY ("usuarioActualizacionId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establecimiento" ADD CONSTRAINT "Establecimiento_comercianteId_fkey" FOREIGN KEY ("comercianteId") REFERENCES "Comerciante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establecimiento" ADD CONSTRAINT "Establecimiento_usuarioActualizacionId_fkey" FOREIGN KEY ("usuarioActualizacionId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
