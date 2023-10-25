import React from "react";
import { Section, Table } from "../style/style";
import FilterVentas from "../components/filterVentas";
import { data } from "../data/venta";
const Venta = () => {
  return (
    <Section>
           <h2>Venta</h2>
      <article> 
         <label >buscar <input type="text" /></label> 
      <button onClick={() => open()}>Exportar</button>
      <button onClick={() => open()}>Añadir</button>
      </article>
      <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Cliente</th>
              <th>fecha</th>
              <th>total</th>
              <th>DetalleVenta</th>
            </tr>
          </thead>
          <tbody>
          {/* <ul>
        {data.map((venta) => (
          <li key={venta.id}>
            <h2>Cliente: {venta.cliente}</h2>
            <p>Fecha: {venta.fecha}</p>
            <p>Total: {venta.total}</p>
            <h3>Detalle de Venta:</h3>
            <ul>
              {venta.detalleventa.map((detalle) => (
                <li key={detalle.id}>
                  <p>Producto ID: {detalle.productoId}</p>
                  <p>Cantidad: {detalle.cantidad}</p>
                  <p>Precio: {detalle.precio}</p>
                </li>
              ))}
            </ul>
            </li>
        ))} */}
        <tbody>
        data.map(producto => (
          <tr  key={producto.id}>
            <td className='pequeño'>{producto.id}</td> 
            <td className='grande'>{producto.nombre}</td>  
            <td>{producto.precio}</td> 
            <td>{producto.precioCompra}</td>  
            <td>{ producto.cantidad }</td>
            <td><button onClick={() => open(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button></td>
          </tr>
        ))
      
          </tbody>
        </Table>
     <FilterVentas/>
    </Section>
  );
};

export default Venta;
