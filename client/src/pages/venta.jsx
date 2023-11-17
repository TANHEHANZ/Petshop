import React, { useEffect, useState } from "react";
import { Section, Table } from "../style/style";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import styled from "styled-components";
import { useGetDelete } from "../hooks/useGetDelete";
import Input from "../components/global/input";
import Select from "../components/global/select";
import { toast } from "react-toastify";
import FormatDate from "../components/global/formatDate";
import { filterBy } from "../utilities/filterBy";
import { formatDate } from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const Venta = () => {
  const { open, close, modalRef } = useModal();
  const { item, open: openDetalle, modalRef: modalDetalleRef } = useModal();
  const { res: venta, handleGet } = useGetDelete("venta");
  const { res: clienteRes } = useGetDelete("cliente");
  const { res: productoRes } = useGetDelete("producto");
  const [filter, setFilter] = useState("");
  const [filterCliente, setFiltercliente] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [filterInput, setFilterInput] = useState("");
const [errorProducto,setErrorproducto]=useState("")
  const [form, setForm] = useState({
    cliente: "",
    descuento: "",
    tipoPago: "efectivo",
    motivo:"",
    productos: []
  });
  const [error, setError] = useState({
    recete: true
  });

  const addProduct = (e) => {
    e.preventDefault();
    if(!productoSeleccionado){
      setErrorproducto("Seleccione producto");
      return
    }
    setErrorproducto("");
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
                producto.cantidad += (cant);
              }
              return producto;
            })
            :
            [...old.productos, {
              id: prod.id,
              nombre: prod.nombre,
              cantidad: cant,
              precio: prod.precio
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
  const handleVaidation = (e) => {
    e.preventDefault();
    const newerror = {}
    if (form.cliente == "") {
      newerror.cliente = "Seleccione un cliente";
    }
    if (form.productos.length == 0) {
      newerror.productos = "Seleccione al menos un producto"
    }
    setError(newerror);
  }
  useEffect(() => {
    if (Object.keys(error).length == 0) {
      handleSend();
    }
  }, [error]);
  const handleSend = async () => {
    const body = JSON.stringify({
      cliente: Number(form.cliente),
      tipoPago: form.tipoPago,
      descuento: Number(form.descuento),
      motivo:form.motivo,
      productos: form.productos
    })
    const res = await fetch(`https://petshop-backend-coral.vercel.app/vender`, {
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
        handleGet();
        setForm({
          cliente: "",
          descuento: "",
          tipoPago: "",
          motivo:"",
          productos: []
        });
        close();
      }
    }
  }

  let total = form.productos.length === 0 ? "N/A" : form.productos.reduce((suma, producto) => {
    suma += producto.precio * producto.cantidad;
    return suma;
  }, 0) + "Bs.";

  return (
    <Section>
      <h2>Venta</h2>
      <article>
        <label><p>Buscar por fecha</p><input value={filterInput} onChange={e => setFilterInput(e.target.value)} type="text" /></label>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalDetalleRef}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio de venta</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              item?.DetalleVenta.map((detalle, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{detalle.producto.nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio}</td>
                  <td>{detalle.precio * detalle.cantidad}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Modal>
      <Modal ref={modalRef}>
        <Separator>
          <form>
            <Input
              name="Nro Carnet"
              value={filterCliente}
              onChange={(e) => setFiltercliente(e.target.value)}
              type="number"
            />
            <Select
              name="Cliente"
              value={form.cliente}
              onChange={e => setForm(old => ({ ...old, cliente: e.target.value }))}
              options={clienteRes?.data.filter(
                cliente => filterBy(String(cliente.ci), filterCliente)
              ).map(cliente => ({
                value: cliente.ci,
                text: cliente.nombre + cliente.apellido,
              }))}
              nodefault
              error={error.cliente}
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
                    text: producto.nombre + ` (${producto.cantidad} ${producto.unidadmedida} disponible) (${producto.precio} Bs. c/u)`
                  })
                  )}
              nodefault
              error={errorProducto}
            />

            <Input
              name="Cantidad"
              value={cantidad}
              onChange={e => setCantidad(e.target.value)}
              type="number"
            />
            <Input
              name="Descuento"
              value={form.descuento}
              onChange={e => setForm(old => ({ ...old, descuento: e.target.value }))}
              type="number"
            />
            <Input
              name="Motivo del descuento"
              value={form.motivo}
              onChange={e => setForm(old => ({ ...old, motivo: e.target.value }))}
              type="text"
            />
            <button onClick={addProduct}>Añadir Producto</button>
            <p>Total: {total}</p>
            <div />
            <div />

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
            <button onClick={handleVaidation}>Vender</button>
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
              <th>Precio</th>
              <th>Descuento</th>
              <th>Motivo de descuento</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              venta?.data.filter(detalle => filterBy(formatDate(detalle.fecha), filterInput)).map((venta, i) => (
                <tr key={venta.id}>
                  <td>{i + 1}</td>
                  <td><FormatDate fecha={venta.fecha} /></td>
                  <td className='grande'>{venta.cliente.nombre}</td>
                  <td>{venta.tipoPago}</td>
                  <td>{venta.total + venta.descuento} Bs</td>
                  <td>{venta.descuento} Bs</td>
                  <td>{venta.motivo}</td>
                  <td>{venta.total} Bs</td>
                  <td ><button onClick={() => openDetalle(venta)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#1877F2" }}
                    />
                    Ver detalle</button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Section>
  );
};

export default Venta;

const Separator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & p{
    width: 100%;
  }
`;
const Divcliente = styled.div`
  width: 30vw;
  height: 10vh;
`;