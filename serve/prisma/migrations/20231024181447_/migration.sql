/*
  Warnings:

  - You are about to drop the column `marca` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `proveedor` table. All the data in the column will be lost.
  - Added the required column `direccion` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcaId` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadmedida` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudad` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gmail` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razonSocial` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `representante` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descuento` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inpuestoGeneradoVenta` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPago` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `direccion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `marca`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `marcaId` INTEGER NOT NULL,
    ADD COLUMN `unidadmedida` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `proveedor` DROP COLUMN `nombre`,
    ADD COLUMN `ciudad` VARCHAR(191) NOT NULL,
    ADD COLUMN `gmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `razonSocial` VARCHAR(191) NOT NULL,
    ADD COLUMN `representante` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `descuento` DOUBLE NOT NULL,
    ADD COLUMN `inpuestoGeneradoVenta` DOUBLE NOT NULL,
    ADD COLUMN `tipoPago` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `Marca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
