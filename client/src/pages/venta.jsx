import React, { useEffect, useState } from "react";
import { Section, Table } from "../style/style";
import FilterVentas from "../components/filterVentas";
import { data } from "../data/venta";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import Form from "../components/global/form";
import styled from "styled-components";
import { useGetDelete } from "../hooks/useGetDelete";
import Datalist from "../components/global/datalist";
const Venta = () => {
  const { open, close, modalRef } = useModal();
  const { res: clienteRes } = useGetDelete("cliente");
  const { res: productoRes } = useGetDelete("producto");

  const [formData, setFormData] = useState([
    {
      name: "tipoPago",
      type: "select",
      default: "efectivo",
      options: [{
        name: "Efectivo",
        value: "efectivo"
      },{
        name: "QR",
        value: "qr"
      }, {
        name: "Crédito",
        value: "credito"
      }],
      optionDisplayName: "name",
      optionValue: "value",
      validations: {
        required: true,
      },
    },
    {
      name: "descuento",
      type: "number",
      validations: {
        required: true,
      },
    },
    {
      name: "cliente",
      type: "select",
      default: null,
      selectType: "number",
      options: [],
      optionDisplayName: "nombre",
      optionValue: "ci",
      validations: {
        required: true,
      },
    },
  ]);

  useEffect(() => {
    if(clienteRes) {
      setFormData(() => formData.map(field => {
        if(field.name === "cliente") {
          field.options = clienteRes.data
        }
        return field;
      }))
    }
  }, [clienteRes])

  return (
    <Section>
      <h2>Venta</h2>
      <article> 
        <label >buscar <input type="text" /></label> 
        <button onClick={() => {}}>Exportar</button>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalRef} >
        <Separator>
          <Form
            fields={formData}
            route={"/venta"}
            onSuccess={res => {
              alert(res.message);
            }}
          />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={1}>
                  <button>Añadir producto</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Separator>
      </Modal>
      <div>
      <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Cliente</th>
              <th>fecha</th>
              <th>total</th>
              <th>DetalleVenta</th>
              <th>acciones</th>
            </tr>
          </thead>
        
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
       {
         data.map(producto => (
          <tr  key={producto.id}>
            <td className='pequeño'>{producto.id}</td> 
            <td className='grande'>{producto.cliente}</td>  
            <td>{producto.fecha}</td> 
            <td>{producto.total}</td>  
            <td>{ producto.detalle }</td>
            <td><button onClick={() => open(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button></td>
          </tr>
        ))
       }
      
          </tbody>
        </Table>
     </div>
     <FilterVentas/>
    </Section>
  );
};

export default Venta;

const Separator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;