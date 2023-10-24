import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/detalleVenta", async (req, res) => {
  const detalleVenta = await prisma.detalleVenta.findMany({});
  res.json({
    data: detalleVenta,
    message: "detalleVenta obtenidos correctamente",
  });
});

app.post("/detalleVenta", async (req, res) => {
  const detalleVenta = await prisma.detalleVenta.create({
    data: req.body,
  });
  res.json({
    data: detalleVenta,
    message: "detalleVenta creado correctamente",
  });
});
app.put("/detalleVenta/:id", async (req, res) => {
  const detalleVenta = await prisma.detalleVenta.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: detalleVenta,
    message: "detalleVenta actualizaco correctamente",
  });
});
app.delete("/detalleVenta/:id", async (req, res) => {
  const detalleVenta = await prisma.detalleVenta.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: detalleVenta,
    message: "detalleVenta eliminado correctamente",
  });
});
app.get("/detalleVenta/:id", async (req, res) => {
  const detalleVenta = await prisma.detalleVenta.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: detalleVenta,
    message: "detalleVenta obtenido correctamente",
  });
});

export default app