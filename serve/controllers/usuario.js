import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findMany({});
    res.json({
      data: usuario,
      message: "usuarios obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.create({
      data: req.body,
    });
    res.json({
      data: usuario,
      message: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar usuario",
      error: error.message,
    });
  }
});
app.put("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: usuario,
      message: "usuarios actualizaco correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar usuario",
      error: error.message,
    });
  }
});
app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
});
app.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});

export default app;
