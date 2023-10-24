import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/proveedor", async (req, res) => {
  const proveedor = await prisma.proveedor.findMany({});
  res.json({
    data: proveedor,
    message: "proveedor obtenidos correctamente",
  });
});

app.post("/proveedor", async (req, res) => {
  const proveedor = await prisma.proveedor.create({
    data: req.body,
  });
  res.json({
    data: proveedor,
    message: "proveedor creado correctamente",
  });
});
app.put("/proveedor/:id", async (req, res) => {
  const proveedor = await prisma.proveedor.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.json({
    data: proveedor,
    message: "proveedor actualizaco correctamente",
  });
});
app.delete("/proveedor/:id", async (req, res) => {
  const proveedor = await prisma.proveedor.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: proveedor,
    message: "proveedor eliminado correctamente",
  });
});
app.get("/proveedor/:id", async (req, res) => {
  const proveedor = await prisma.proveedor.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    data: proveedor,
    message: "proveedor obtenido correctamente",
  });
});

export default app