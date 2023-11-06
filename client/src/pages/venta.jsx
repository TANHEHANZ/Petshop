import React, { useRef, useState } from "react";
import { Section, Table } from "../style/style";
import FilterVentas from "../components/filterVentas";
import { data } from "../data/venta";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import styled from "styled-components";
import { useGetDelete } from "../hooks/useGetDelete";
import Input from "../components/global/input";
import Select from "../components/global/select";
import { toast } from "react-toastify";
import FormatDate from "../components/global/formatDate";
const Venta = () => {
  const { open, close, modalRef } = useModal();
  const { res: venta } = useGetDelete("venta");
  const { res: clienteRes } = useGetDelete("cliente");
  const { res: productoRes } = useGetDelete("producto");
  const [filter, setFilter] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [form, setForm] = useState({
    cliente: "",
    descuento: "",
    tipoPago: "",
    productos: []
  });

  const addProduct = (e) => {
    e.preventDefault();
    setForm(old => {
      const prod = JSON.parse(productoSeleccionado);
      const cant = Number(cantidad);
      const productoExistente = old.productos.find(producto => producto.id === prod.id);
      return {
        ...old,
        productos:
          productoExistente ?
            old.productos.map(producto => {
              if (producto.id === prod.id) {
                producto.cantidad += (cant/2);
              }
              return producto;
            })
            :
            [...old.productos, {
              id: prod.id,
              nombre: prod.nombre,
              cantidad: cant
            }]
      }
    });
    setFilter("");
    setProductoSeleccionado("");
    setCantidad("1");
  }

  const removeProducto = (e, id) => {
    e.preventDefault();
    setForm(old => ({
      ...old,
      productos: old.productos.filter(producto => producto.id !== id)
    }))
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      cliente: Number(form.cliente),
      tipoPago: form.tipoPago,
      descuento: Number(form.descuento),
      productos: form.productos
    })
    console.log(body);
    const res = await fetch(`http://localhost:3000/vender`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: body
    })
    if (res.ok) {
      const resJson = await res.json();
      if (resJson.error) {
        toast.error(resJson.error);
      } else {
        toast.success(resJson.message);
        close();
      }
    }
  }

 
  return (
    <Section>
      <h2>Venta</h2>
      <article>
        <label>Buscar<input type="text" /></label>
        <button onClick={() => { }}>Exportar</button>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalRef}>
        <Separator>
          <form>
            <Select
              name="Cliente"
              value={form.cliente}
              onChange={e => setForm(old => ({ ...old, cliente: e.target.value }))}
              options={clienteRes?.data.map(cliente => ({
                value: cliente.ci,
                text: cliente.nombre
              }))}
              nodefault
            />
            <Input
              name="Descuento"
              value={form.descuento}
              onChange={e => setForm(old => ({ ...old, descuento: e.target.value }))}
              type="number"
            />
            <Select
              name="Tipo de pago"
              value={form.tipoPago}
              onChange={e => setForm(old => ({ ...old, tipoPago: e.target.value }))}
              options={[{
                value: "efectivo",
                text: "Efectivo"
              }, {
                value: "qr",
                text: "QR"
              }, {
                value: "tarjeta",
                text: "Tarjeta"
              }]}
            />
            <Input
              name="Busqueda"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <Select
              name="Producto"
              value={productoSeleccionado}
              onChange={e => setProductoSeleccionado(e.target.value)}
              options={
                productoRes?.data
                  .filter(producto => producto.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                  .map(producto => ({
                    value: JSON.stringify(producto),
                    text: producto.nombre + ` (${producto.cantidad} ${producto.unidadmedida})`
                  })
                  )}
              nodefault
            />
            <Input
              name="Cantidad"
              value={cantidad}
              onChange={e => setCantidad(e.target.value)}
              type="number"
            />
            <button onClick={addProduct}>Añadir producto</button>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  form.productos.map((producto, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.cantidad}</td>
                      <td>
                        <button onClick={e => removeProducto(e, producto.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <button onClick={handleSend}>Enviar</button>
          </form>
        </Separator>
      </Modal>
      <div>
        <Table>
          <thead>
            <tr>
             <th >Numero de venta</th>
              <th>Fecha Registro</th>
              <th>Cliente</th>
              <th>Tipo de pago</th>
              <th>total</th>
          
            </tr>
          </thead>
          <tbody>
            {
              venta?.data.map(venta => (
                <tr key={venta.id}>
                <td>{venta.id}</td>
                  <td><FormatDate fecha={venta.fecha}/></td>
                  <td className='grande'>{venta.cliente.nombre}</td>
                  <td>{venta.tipoPago}</td>
                  <td>{venta.total} Bs</td>
                  <td><button>Ver detalle</button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      <FilterVentas />
    </Section>
  );
};

export default Venta;

const Separator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
