import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/cliente", async (req, res) => {
  try {
    const cliente = await prisma.cliente.findMany({});
    res.json({
      data: cliente,
      message: "clientes obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener cliente",
      error: error.message,
    });
  }
});

app.post("/cliente", async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({
      data: req.body,
    });
    res.json({
      data: cliente,
      message: "cliente creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar cliente",
      error: error.message,
    });
  }
});
app.put("/cliente/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.update({
      where: {
        ci: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: cliente,
      message: "clientes actualizaco correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar cliente",
      error: error.message,
    });
  }
});
app.delete("/cliente/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.delete({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: cliente,
      message: "cliente eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar cliente",
      error: error.message,
    });
  }
});
app.get("/cliente/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: cliente,
      message: "cliente obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener cliente",
      error: error.message,
    });
  }
});

export default app;
