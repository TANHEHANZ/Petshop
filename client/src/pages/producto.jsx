import React from 'react'
import { useModal } from '../hooks/useModal';
import { useGetDelete } from '../hooks/useGetDelete';
import productos from '../data/producto.json'
import Modal from '../components/global/modal';
import Form from '../components/global/form';

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
    <div>
      <button onClick={() => open()}>Añadir</button>
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
      {
        res?.data.map(producto => (
          <div key={producto.id}>
            {producto.id} - {producto.nombre} - {producto.precio} - {producto.precioCompra} - { producto.cantidad }
            <button onClick={() => open(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </div>
        ))
      }
    </div>
  )
}

export default Producto