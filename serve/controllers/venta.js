import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/venta", async (req, res) => {
  try {
    const venta = await prisma.venta.findMany({
      include:{
        cliente:true
      }
    });
    res.json({
      data: venta,
      message: "venta obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener venta",
      error: error.message,
    });
  }
});

app.post("/venta", async (req, res) => {
  try {
    const venta = await prisma.venta.create({
      data: req.body,
    });
    res.json({
      data: venta,
      message: "venta creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar venta",
      error: error.message,
    });
  }
});
app.put("/venta/:id", async (req, res) => {
  try {
    const venta = await prisma.venta.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: venta,
      message: "venta actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar venta",
      error: error.message,
    });
  }
});
app.get("/venta/:id", async (req, res) => {
  try {
    const venta = await prisma.venta.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: venta,
      message: "venta obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener venta",
      error: error.message,
    });
  }
});
app.post("/vender", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        id: {
          in: req.body.productos.map(producto => producto.id)
        }
      }
    });
    //VALIDAR
    let flag = false;
    req.body.productos.forEach(producto => {
      const productoExistente = productos.find(prod => prod.id === producto.id);
      if(producto.cantidad > productoExistente.cantidad) {
        flag = true;
        res.json({
          message: "Error",
          error: "la cantidad de " + productoExistente.nombre + " no puede ser mayor a la existente"
        })
      }
    });
    if(flag) return;
    const total = productos.reduce((suma, producto) => {
      const productoVendido = req.body.productos.find(prod => prod.id === producto.id);
      const totalProducto = producto.precio * productoVendido.cantidad;
      suma += totalProducto;
      return suma;
    }, 0);
    const venta = await prisma.venta.create({
      data: {
        clienteId: req.body.cliente,
        tipoPago: req.body.tipoPago,
        descuento: req.body.descuento || 0,
        total: total - req.body.descuento,
        DetalleVenta: {
          createMany: {
            data: req.body.productos.map(producto => ({
              cantidad: producto.cantidad,
              productoId: producto.id,  
              precio: productos.find(prod => prod.id === producto.id).precio
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
            decrement: producto.cantidad
          }
        }
      })
    });
    res.json({
      message: "Vendido correctamente",
      data: venta
    })
  } catch (e) {
    res.status(500).json({
      message: "Error",
      error: e.message
    })
  }
});

export default app;
