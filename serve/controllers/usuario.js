import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  const usuario = await prisma.usuario.findMany({});
  res.json({
    data: usuario,
    message: "usuarios obtenidos correctamente",
  });
});

app.post("/usuario", async (req, res) => {
  const usuario = await prisma.usuario.create({
    data: req.body,
  });
  res.json({
    data: usuario,
    message: "usuario creado correctamente",
  });
});
app.put("/usuario/:id", async (req, res) => {
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
});
app.delete("/usuario/:id", async (req, res) => {
  const usuario = await prisma.usuario.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: usuario,
    message: "usuario eliminado correctamente",
  });
});
app.get("/usuario/:id", async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: usuario,
    message: "usuario obtenido correctamente",
  });
});

export default app