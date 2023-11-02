import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { useGetDelete } from "../hooks/useGetDelete";
import Modal from "../components/global/modal";
import Form from "../components/global/form";
import { Section, Table } from "../style/style";

const Producto = () => {
  const { item, modalRef, open, close } = useModal();
  const { res, handleGet, handleDelete } = useGetDelete("producto");
  const [categoria, setCategoria] = useState([]);

  const formData = [
    {
      name: "nombre",
      validations: {
        required: true,
      },
    },

    {
      name: "descripcion",
      validations: {
        required: true,
      },
    },
    {
      name: "unidadmedida",
      validations: {
        required: true,
      },
    },
    {
      name: "marca",
      validations: {
        required: true,
      },
    },
    {
      name: "precio",
      type: "number",
      validations: {
        required: true,
      },
    },
    {
      name: "categoria",
      type: "number",
      validations: {
        require: true,
      },
    },
    {
      name: "precioCompra",
      type: "number",
      validations: {
        required: true,
      },
    },
    {
      name: "cantidad",
      type: "number",
      validations: {
        required: true,
      },
    },
  ];
  const fetchData = async (value) => {
    const response=await fetch(`http://localhost:3000/categoria`,{
      method:"GET",
      headers:{
        "Content-Type":"applicacion/json",
        "accept":"applicacion/json",
      },
    })
    const respuesta=await response.json();
   setCategoria(respuesta);
  }
  console.log(categoria);
  const handleCategoria = (value) => {
    setCategoria(value);
    fetchData(value);
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <Section>
      <h2>Productos</h2>
      <article>
        <label>
          Buscar <input type="text" />
        </label>
       <div>
       <button onClick={() => open()}>Exportar</button>
        <button onClick={() => open()}>Añadir</button>
       </div>
      </article>
{/*       <input type="text" placeholder="Agregar categoria" value={categoria} onChange={(e) => handleCategoria(e.target.value)} /> */}
      <Modal ref={modalRef}>
        <Form
          key={JSON.stringify(item)}
          item={item}
          fields={formData}
          route={item ? `/producto/${item.id}` : "/producto"}
          onSuccess={(res) => {
            alert(res.message);
            handleGet();
            close();
          }}
        />
      </Modal>
      <div>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>nombre</th>
              <th>descripcion</th>
              <th>precio</th>
              <th>precioCompra</th>
              <th>precioCantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {res?.data.map((producto) => (
              <tr key={producto.id}>
                <td className="pequeño">{producto.id}</td>
                <td className="grande">{producto.nombre}</td>
                <td className="grande">{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.precioCompra}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <button onClick={() => open(producto)}>Editar</button>
                  <button onClick={() => handleDelete(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Section>
  );
};

export default Producto;
