import React from 'react'
import { useModal } from '../hooks/useModal';
import clientes from '../data/clientes.json'
import Modal from '../components/global/modal';
import Form from '../components/global/form';

const Cliente = () => {
  const { item, modalRef, open, close } = useModal();

  const formData = [
    {
      name: "ci",
      validations: {
        required: true
      }
    },
    {
      name: "nombre",
      validations: {
        required: true
      }
    },
    {
      name: "apellido",
      validations: {
        required: true
      }
    },
    {
      name: "telefono",
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
          route={item ? `/cliente/${item.ci}` : "/cliente"}
          onSuccess={res => {
            alert(res.message);
            close();
          }}
        />
      </Modal>
      {
        clientes.map(cliente => (
          <div key={cliente.ci}>
            {cliente.ci} - {cliente.nombre} - {cliente.apellido} - { cliente.telefono }
            <button onClick={() => open(cliente)}>Editar</button>
            <button>Eliminar</button>
          </div>
        ))
      }
    </div>
  )
}

export default Cliente