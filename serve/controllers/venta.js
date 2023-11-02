import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/venta", async (req, res) => {
  try {
    const venta = await prisma.venta.findMany({});
    res.json({
      data: venta,
      message: "venta obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener venta",
      error: error.message,
    });
  }
});

app.post("/venta", async (req, res) => {
  try {
    const venta = await prisma.venta.create({
      data: req.body,
    });
    res.json({
      data: venta,
      message: "venta creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar venta",
      error: error.message,
    });
  }
});
app.put("/venta/:id", async (req, res) => {
  try {
    const venta = await prisma.venta.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: venta,
      message: "venta actualizaco correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar venta",
      error: error.message,
    });
  }
});
app.get("/venta/:id", async (req, res) => {
  try {
    const venta = await prisma.venta.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: venta,
      message: "venta obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener venta",
      error: error.message,
    });
  }
});

export default app;
