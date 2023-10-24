import React from 'react'
import Form from '../components/global/form'
import { useModal } from '../hooks/useModal'
import Modal from '../components/global/modal'
import { useGetDelete } from '../hooks/useGetDelete'

const User = () => {
  const { item, modalRef, open, close } = useModal();
  const { res, handleGet, handleDelete } = useGetDelete("usuario");

  const formData = [
    {
      name: "nombre",
      validations: {
        required: true
      }
    },
    {
      name: "correo",
      validations: {
        required: true
      }
    },
    {
      name: "password",
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
          route={item ? `/usuario/${item.id}` : "/usuario"}
          onSuccess={res => {
            alert(res.message);
            handleGet();
            close();
          }}
        />
      </Modal>
      {
        res?.data.map(usuario => (
          <div key={usuario.id}>
            {usuario.id} - {usuario.nombre} - {usuario.correo} - { usuario.password }
            <button onClick={() => open(usuario)}>Editar</button>
            <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
          </div>
        ))
      }
    </div>
  )
}

export default User