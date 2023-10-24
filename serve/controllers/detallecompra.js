import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/detalleCompra", async (req, res) => {
  const detalleCompra = await prisma.detalleCompra.findMany({});
  res.json({
    data: detalleCompra,
    message: "detalleCompra obtenidos correctamente",
  });
});

app.post("/detalleCompra", async (req, res) => {
  const detalleCompra = await prisma.detalleCompra.create({
    data: req.body,
  });
  res.json({
    data: detalleCompra,
    message: "detalleCompra creado correctamente",
  });
});
app.put("/detalleCompra/:id", async (req, res) => {
  const detalleCompra = await prisma.detalleCompra.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: detalleCompra,
    message: "detalleCompra actualizaco correctamente",
  });
});
app.delete("/detalleCompra/:id", async (req, res) => {
  const detalleCompra = await prisma.detalleCompra.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: detalleCompra,
    message: "detalleCompra eliminado correctamente",
  });
});
app.get("/detalleCompra/:id", async (req, res) => {
  const detalleCompra = await prisma.detalleCompra.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: detalleCompra,
    message: "detalleCompra obtenido correctamente",
  });
});

export default app