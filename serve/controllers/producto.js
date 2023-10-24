import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/producto", async (req, res) => {
  const producto = await prisma.producto.findMany({});
  res.json({
    data: producto,
    message: "productos obtenidos correctamente",
  });
});

app.post("/producto", async (req, res) => {
  const producto = await prisma.producto.create({
    data: req.body,
  });
  res.json({
    data: producto,
    message: "producto creado correctamente",
  });
});
app.put("/producto/:id", async (req, res) => {
  const producto = await prisma.producto.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: producto,
    message: "productos actualizaco correctamente",
  });
});
app.delete("/producto/:id", async (req, res) => {
  const producto = await prisma.producto.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: producto,
    message: "producto eliminado correctamente",
  });
});
app.get("/producto/:id", async (req, res) => {
  const producto = await prisma.producto.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: producto,
    message: "producto obtenido correctamente",
  });
});

export default app