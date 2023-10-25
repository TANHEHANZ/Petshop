import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/marca", async (req, res) => {
  const marca = await prisma.marca.findMany({});
  res.json({
    data: marca,
    message: "marcas obtenidos correctamente",
  });
});

app.post("/marca", async (req, res) => {
  const marca = await prisma.marca.create({
    data: req.body,
  });
  res.json({
    data: marca,
    message: "marca creado correctamente",
  });
});
app.put("/marca/:id", async (req, res) => {
  const marca = await prisma.marca.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: marca,
    message: "marcas actualizaco correctamente",
  });
});
app.delete("/marca/:id", async (req, res) => {
  const marca = await prisma.marca.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: marca,
    message: "marca eliminado correctamente",
  });
});
app.get("/marca/:id", async (req, res) => {
  const marca = await prisma.marca.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: marca,
    message: "marca obtenido correctamente",
  });
});

export default app