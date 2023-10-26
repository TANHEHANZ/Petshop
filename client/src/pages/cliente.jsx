import React from 'react'
import { useModal } from '../hooks/useModal';
import clientes from '../data/clientes.json'
import Modal from '../components/global/modal';
import Form from '../components/global/form';
import { useGetDelete } from '../hooks/useGetDelete';
import { Section, Table } from '../style/style';

const Cliente = () => {
  const { item, modalRef, open, close } = useModal();
  const { res, handleGet, handleDelete } = useGetDelete("cliente");

  const formData = [
    {
      name: "ci",
      type: "number",
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
      type: "number",
      validations: {
        required: true
      }
    }
  ]

  return (
    <Section>
       <h2>Clientes</h2>
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
          route={item ? `/cliente/${item.ci}` : "/cliente"}
          onSuccess={res => {
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
            <th>Ci</th>
            <th>nombre</th>
            <th>apellido</th>
            <th>telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {res?.data.map((cliente) => (
            <tr key={cliente.id}>
              <td className="pequeño">{cliente.id}</td>
              <td className="grande">{cliente.nombre}</td>
              <td className="grande">{cliente.apellido}</td>
              <td className="grande">{cliente.telefono}</td>
              <td>
              <button onClick={() => open(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.ci)}>Eliminar</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
   </div>
    </Section>
  )
}

export default Cliente