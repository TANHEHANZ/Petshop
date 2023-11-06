import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/detalleCompra", async (req, res) => {
  try {
    const detalleCompra = await prisma.detalleCompra.findMany({});
    res.json({
      data: detalleCompra,
      message: "detalleCompra obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detallecompra",
      error: error.message,
    });
  }
});

app.post("/detalleCompra", async (req, res) => {
  try {
    const detalleCompra = await prisma.detalleCompra.create({
      data: req.body,
    });
    res.json({
      data: detalleCompra,
      message: "detalleCompra creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar detallecompra",
      error: error.message,
    });
  }
});
app.put("/detalleCompra/:id", async (req, res) => {
  try {
    const detalleCompra = await prisma.detalleCompra.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: detalleCompra,
      message: "detalleCompra actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar detallecompra",
      error: error.message,
    });
  }
});
app.delete("/detalleCompra/:id", async (req, res) => {
  try {
    const detalleCompra = await prisma.detalleCompra.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: detalleCompra,
      message: "detalleCompra eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar detallecompra",
      error: error.message,
    });
  }
});

export default app;
