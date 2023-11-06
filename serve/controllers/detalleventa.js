import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/detalleVenta", async (req, res) => {
  try {
    const detalleVenta = await prisma.detalleVenta.findMany({});
    res.json({
      data: detalleVenta,
      message: "detalleVenta obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detalleVenta",
    });
  }
});

app.post("/detalleVenta", async (req, res) => {
  try {
    const detalleVenta = await prisma.detalleVenta.create({
      data: req.body,
    });
    res.json({
      data: detalleVenta,
      message: "detalleVenta creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar detalleVenta",
    });
  }
});
app.put("/detalleVenta/:id", async (req, res) => {
  try {
    const detalleVenta = await prisma.detalleVenta.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: detalleVenta,
      message: "detalleVenta actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar detalleVenta",
    });
  }
});

export default app;
