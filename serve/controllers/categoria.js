import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/categoria", async (req, res) => {
  try {
    const categoria = await prisma.categoria.findMany({});
    res.json({
      data: categoria,
      message: "categorias obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener categoria",
      error: error.message,
    });
  }
});

app.post("/categoria", async (req, res) => {
  try {
    const categoria = await prisma.categoria.create({
      data: req.body,
    });
    res.json({
      data: categoria,
      message: "categoria creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar categoria",
      error: error.message,
    });
  }
});
app.put("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: categoria,
      message: "categoria actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar categoria",
      error: error.message,
    });
  }
});
app.delete("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: categoria,
      message: "categoria eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar categoria",
      error: error.message,
    });
  }
});
app.get("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: categoria,
      message: "categoria obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la categoria",
      error: error.message,
    });
  }
});

export default app;
