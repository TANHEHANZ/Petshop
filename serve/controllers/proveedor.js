import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/proveedor", async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.findMany({});
    res.json({
      data: proveedor,
      message: "proveedor obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener proveedor",
      error: error.message,
    });
  }
});

app.post("/proveedor", async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.create({
      data: req.body,
    });
    res.json({
      data: proveedor,
      message: "proveedor creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar proveedor",
      error: error.message,
    });
  }
});
app.put("/proveedor/:id", async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: proveedor,
      message: "proveedor actualizaco correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar proveedor",
      error: error.message,
    });
  }
});
app.delete("/proveedor/:id", async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: proveedor,
      message: "proveedor eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar proveedor",
      error: error.message,
    });
  }
});
app.get("/proveedor/:id", async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: proveedor,
      message: "proveedor obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener proveedor",
      error: error.message,
    });
  }
});

export default app;
