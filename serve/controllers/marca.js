import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/marca", async (req, res) => {
  try {
    const marca = await prisma.marca.findMany({});
    res.json({
      data: marca,
      message: "marcas obtenidas correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener marca",
      error: error.message,
    });
  }
});

app.post("/marca", async (req, res) => {
  try {
    const marca = await prisma.marca.create({
      data: req.body,
    });
    res.json({
      data: marca,
      message: "marca creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar marca",
      error: error.message,
    });
  }
});
app.put("/marca/:id", async (req, res) => {
  try {
    const marca = await prisma.marca.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: marca,
      message: "marca actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar marca",
      error: error.message,
    });
  }
});
app.delete("/marca/:id", async (req, res) => {
  try {
    const marca = await prisma.marca.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: marca,
      message: "marca eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar marca",
      error: error.message,
    });
  }
});
app.get("/marca/:id", async (req, res) => {
  try {
    const marca = await prisma.marca.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: marca,
      message: "marca obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener marca",
      error: error.message,
    });
  }
});

export default app;
