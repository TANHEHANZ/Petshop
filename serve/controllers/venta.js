import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/venta", async (req, res) => {
  const venta = await prisma.venta.findMany({});
  res.json({
    data: venta,
    message: "venta obtenidos correctamente",
  });
});

app.post("/venta", async (req, res) => {
  const venta = await prisma.venta.create({
    data: req.body,
  });
  res.json({
    data: venta,
    message: "venta creado correctamente",
  });
});
app.put("/venta/:id", async (req, res) => {
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
});
app.delete("/venta/:id", async (req, res) => {
  const venta = await prisma.venta.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: venta,
    message: "venta eliminado correctamente",
  });
});
app.get("/venta/:id", async (req, res) => {
  const venta = await prisma.venta.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: venta,
    message: "venta obtenido correctamente",
  });
});

export default app