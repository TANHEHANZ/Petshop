import React, { useEffect, useState } from "react";
import { Section, Table } from "../style/style";
import FilterVentas from "../components/filterVentas";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import styled from "styled-components";
import { useGetDelete } from "../hooks/useGetDelete";
import Input from "../components/global/input";
import Select from "../components/global/select";
import { toast } from "react-toastify";
import FormatDate from "../components/global/formatDate";
import { formatDate } from "../utilities/formatDate";
import { filterBy } from "../utilities/filterBy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Compra = () => {
  const { open, close, modalRef } = useModal();
  const { item, open: openDetalle, modalRef: modalDetalleRef } = useModal();
  const { res: compra, handleGet } = useGetDelete("compra");
  const { res: proveedorRes } = useGetDelete("proveedor");
  const { res: productoRes } = useGetDelete("producto");
  const [filter, setFilter] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [filterInput, setFilterInput] = useState("");
  const [form, setForm] = useState({
    proveedor: "",
    productos: []
  });
  const [errorProducto,setErrorProducto]=useState("");
  const [error,setError]=useState({
    recibe:true
  });
  const addProduct = (e) => {
    e.preventDefault();
    if(!productoSeleccionado){
      setErrorProducto("Seleccione producto");
      return
    }
    setErrorProducto("");
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
                producto.cantidad += (cant/2);// tu eres el error cuando se agrega 1 sale error
              }
              return producto;
            })
            :
            [...old.productos, {
              id: prod.id,
              nombre: prod.nombre,
              cantidad: cant,
              precio: prod.precioCompra
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

  const handleSend = async () => {
   
    const body = JSON.stringify({
      proveedor: Number(form.proveedor),
      productos: form.productos
    })
    const res = await fetch(`https://petshop-backend-coral.vercel.app/comprar`, {
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
          proveedor: "",
          productos: []
        });
        close();
      }
    }
  }
  useEffect(() => {
    if (Object.keys(error).length == 0) {
      handleSend();
    }
  }, [error]);
  let total = form.productos.length === 0 ? "N/A" : form.productos.reduce((suma, producto) => {
    suma += producto.precio * producto.cantidad;
    return suma;
  }, 0) + "Bs.";
  const handleVaidation = (e) => {
    e.preventDefault();
    const newerror = {}
    if (form.proveedor == "") {
      newerror.proveedor = "Seleccione un proveedor";
    }
    if (form.productos.length == 0) {
      newerror.productos = "Seleccione al menos un producto"
    }
    setError(newerror);
  }
  return (
    <Section>
      <h2>Compra</h2>
      <article>
        <label> <p>Buscar por fecha</p><input value={filterInput} onChange={e => setFilterInput(e.target.value)} type="text" /></label>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalDetalleRef}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio de compra</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              item?.DetallecCompra.map((detalle, i) => (
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
            <Select
              name="Proveedor"
              value={form.proveedor}
              onChange={e => setForm(old => ({ ...old, proveedor: e.target.value }))}
              options={proveedorRes?.data.map(proveedor => ({
                value: proveedor.id,
                text: proveedor.razonSocial
              }))}
              nodefault
              error={error.proveedor}
            />
            <div />
            <div />
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
                    text: producto.nombre + ` (${producto.precioCompra} Bs. c/u)`
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
            <div />
            <button onClick={addProduct}>Añadir producto</button>
            <div />
            <p>Total: {total}</p>
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
            <button onClick={handleVaidation}>Comprar</button>
          </form>
        </Separator>
      </Modal>
      <div>
        <Table>
          <thead>
            <tr>
             <th>Numero de compra</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              compra?.data.filter(compra => filterBy(formatDate(compra.fecha), filterInput)).map(compra => (
                <tr key={compra.id}>
                  <td>{compra.id}</td>
                  <td className='grande'>{compra.proveedor.razonSocial}</td>
                  <td><FormatDate fecha={compra.fecha}/></td>
                  <td>{compra.total} Bs</td>
                  <td>
                    <button onClick={() => openDetalle(compra)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#1877F2" }}
                    />
                      Ver detalle</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      {/* <FilterVentas /> */}
    </Section>
  );
};

export default Compra;

const Separator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
