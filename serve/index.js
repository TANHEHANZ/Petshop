
import express from 'express';
import cors from 'cors'

import usuario from './controllers/usuario.js';
import compra from './controllers/compra.js';
import detallecompra from './controllers/detallecompra.js';
import detalleventa from './controllers/detalleventa.js';
import cliente from './controllers/cliente.js';
import producto from './controllers/producto.js';
import proveedor from './controllers/proveedor.js';
import venta from './controllers/venta.js';
import categoria from './controllers/categoria.js';
import marca from "./controllers/marca.js";
const app = express();
const port = 3000;
import bodyParser from "body-parser"
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());
app.use(categoria);
app.use(marca);
app.use(usuario);
app.use(cliente);
app.use(compra);
app.use(detallecompra);
app.use(detalleventa);
app.use(producto);
app.use(proveedor);
app.use(venta);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})