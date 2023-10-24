import React from 'react'
import { useModal } from '../hooks/useModal';
import { useGetDelete } from '../hooks/useGetDelete';
import productos from '../data/producto.json'
import Modal from '../components/global/modal';
import Form from '../components/global/form';
import { Section, Table } from '../style/style';

const Producto = () => {
  const { item, modalRef, open, close } = useModal();
  const { res, handleGet, handleDelete } = useGetDelete("producto");

  const formData = [
    {
      name: "nombre",
      validations: {
        required: true
      }
    },
    {
      name: "marca",
      validations: {
        required: true
      }
    },
    {
      name: "precio",
      type: "number",
      validations: {
        required: true
      }
    },
    {
      name: "precioCompra",
      type: "number",
      validations: {
        required: true
      }
    },
    {
      name: "cantidad",
      type: "number",
      validations: {
        required: true
      }
    }
  ]

  return (
    <Section>
      <h2>Productos</h2>
      <article> 
         <label >buscar <input type="text" /></label> 
      <button onClick={() => open()}>Exportar</button>
      <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalRef}>
        <Form
          key={JSON.stringify(item)}
          item={item}
          fields={formData}
          route={item ? `/producto/${item.id}` : "/producto"}
          onSuccess={res => {
            alert(res.message);
            handleGet();
            close();
          }}
        />
      </Modal>
          <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>nombre</th>
              <th>precio</th>
              <th>precioCompra</th>
              <th>precioCantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

          {
        res?.data.map(producto => (
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
      }
          </tbody>
        </Table>
    </Section>
  )
}

export default Producto