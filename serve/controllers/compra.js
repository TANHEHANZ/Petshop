import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/compra", async (req, res) => {
  const compra = await prisma.compra.findMany({
    include: {
      proveedor: true,
      DetallecCompra: {
        include: {
          producto: true
        }
      }
    }
  });
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

app.post("/comprar", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        id: {
          in: req.body.productos.map(producto => producto.id)
        }
      }
    });
    const total = productos.reduce((suma, producto) => {
      const productoVendido = req.body.productos.find(prod => prod.id === producto.id);
      const totalProducto = producto.precioCompra * productoVendido.cantidad;
      suma += totalProducto;
      return suma;
    }, 0);
    const compra = await prisma.compra.create({
      data: {
        proveedor: {
          connect: {
            id: req.body.proveedor
          }
        },
        total: total,
        DetallecCompra: {
          createMany: {
            data: req.body.productos.map(producto => ({
              cantidad: producto.cantidad,
              productoId: producto.id,  
              precio: productos.find(prod => prod.id === producto.id).precioCompra
            }))
          }
        }
      }
    });
    req.body.productos.forEach(async producto => {
      await prisma.producto.update({
        where: {
          id: producto.id
        },
        data: {
          cantidad: {
            increment: producto.cantidad
          }
        }
      })
    });
    res.json({
      message: "Comprado correctamente",
      data: compra
    })
  } catch (e) {
    res.status(500).json({
      message: "Error",
      error: e.message
    })
  }
});

export default app