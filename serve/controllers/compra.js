import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/compra", async (req, res) => {
  const compra = await prisma.compra.findMany({});
  res.json({
    data: compra,
    message: "compra obtenidos correctamente",
  });
});

app.post("/compra", async (req, res) => {
  const compra = await prisma.compra.create({
    data: req.body,
  });
  res.json({
    data: compra,
    message: "compra creado correctamente",
  });
});
app.put("/compra/:id", async (req, res) => {
  const compra = await prisma.compra.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: compra,
    message: "compra actualizado correctamente",
  });
});
app.get("/compra/:id", async (req, res) => {
  const compra = await prisma.compra.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: compra,
    message: "compra obtenido correctamente",
  });
});

export default app