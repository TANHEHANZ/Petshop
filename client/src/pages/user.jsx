import React from 'react'
import Form from '../components/global/form'
import { useModal } from '../hooks/useModal'
import Modal from '../components/global/modal'
import { useGetDelete } from '../hooks/useGetDelete'
import { Section } from '../style/style'

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
    <Section>
        <h2>Usuarios</h2>
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
    </Section>
  )
}

export default User