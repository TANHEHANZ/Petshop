import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/producto", async (req, res) => {
  try {
    const producto = await prisma.producto.findMany({});
    res.json({
      data: producto,
      message: "productos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener producto",
      error: error.message,
    });
  }
});

app.post("/producto", async (req, res) => {
  try {
    const producto = await prisma.producto.create({
      data: req.body,
    });
    res.json({
      data: producto,
      message: "producto creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar producto",
      error: error.message,
    });
  }
});
app.put("/producto/:id", async (req, res) => {
  try {
    const producto = await prisma.producto.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: producto,
      message: "producto actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar producto",
      error: error.message,
    });
  }
});
app.delete("/producto/:id", async (req, res) => {
  try {
    const producto = await prisma.producto.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: producto,
      message: "producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
});
app.get("/producto/:id", async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: producto,
      message: "producto obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener producto",
      error: error.message,
    });
  }
});

export default app;
