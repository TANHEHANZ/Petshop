import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/categoria", async (req, res) => {
  const categoria = await prisma.categoria.findMany({});
  res.json({
    data: categoria,
    message: "categorias obtenidos correctamente",
  });
});

app.post("/categoria", async (req, res) => {
  const categoria = await prisma.categoria.create({
    data: req.body,
  });
  res.json({
    data: categoria,
    message: "categoria creado correctamente",
  });
});
app.put("/categoria/:id", async (req, res) => {
  const categoria = await prisma.categoria.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: categoria,
    message: "categorias actualizaco correctamente",
  });
});
app.delete("/categoria/:id", async (req, res) => {
  const categoria = await prisma.categoria.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: categoria,
    message: "categoria eliminado correctamente",
  });
});
app.get("/categoria/:id", async (req, res) => {
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: categoria,
    message: "categoria obtenido correctamente",
  });
});

export default app