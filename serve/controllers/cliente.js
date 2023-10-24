import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/cliente", async (req, res) => {
  const cliente = await prisma.cliente.findMany({});
  res.json({
    data: cliente,
    message: "clientes obtenidos correctamente",
  });
});

app.post("/cliente", async (req, res) => {
  const cliente = await prisma.cliente.create({
    data: req.body,
  });
  res.json({
    data: cliente,
    message: "cliente creado correctamente",
  });
});
app.put("/cliente/:id", async (req, res) => {
  const cliente = await prisma.cliente.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: cliente,
    message: "clientes actualizaco correctamente",
  });
});
app.delete("/cliente/:id", async (req, res) => {
  const cliente = await prisma.cliente.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: cliente,
    message: "cliente eliminado correctamente",
  });
});
app.get("/cliente/:id", async (req, res) => {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: cliente,
    message: "cliente obtenido correctamente",
  });
});

export default app