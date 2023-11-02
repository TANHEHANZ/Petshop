import React from 'react'
import { Section, Table } from '../style/style';
import Modal from '../components/global/modal';
import Form from '../components/global/form';
import { useModal } from '../hooks/useModal';
import { useGetDelete } from '../hooks/useGetDelete';
import { toast } from 'react-toastify';

const Proveedor = () => {
  const { item, modalRef, open, close } = useModal();
  const { res, handleGet, handleDelete } = useGetDelete("proveedor");
  const formData = [
    {
      name: "razonSocial",
      validations: {
        required: true
      }
    },
    {
      name: "telefono",
      type: "number",
      validations: {
        required: true
      },
    },
    {
      name: "gmail",
      validations: {
        required: true
      },
    }, {
      name: "representante",
      validations: {
        required: true
      },
    },
    {
      name: "ciudad",
      validations: {
        required: true
      }
    },
    {
      name: "direccion",
      validations: {
        required: true
      }
    }

  ]
  return (
    <Section>
      <h2>Proveedor</h2>
      <article>
        <label>
          Buscar <input type="text" />
        </label>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalRef}>
        <Form
          key={JSON.stringify(item)}
          item={item}
          fields={formData}
          route={item ? `/proveedor/${item.id}` : "/proveedor"}
          onSuccess={(res) => {
            toast.success(res.message);
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
              <th>razon Social</th>
              <th>Telefono</th>
              <th>direccion</th>
              <th>gmail</th>
              <th>representante</th>
              <th>ciudad</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>
            {res?.data.map((proveedores) => (
              <tr key={proveedores.id}>
                <td className="pequeño">{proveedores.id}</td>
                <td className="pequeño">{proveedores.razonSocial}</td>
                <td className="pequeño">{proveedores.telefono}</td>
                <td className="grande">{proveedores.direccion}</td>
                <td className="pequeño">{proveedores.gmail}</td>
                <td className="pequeño">{proveedores.representante}</td>
                <td className="pequeño">{proveedores.ciudad}</td>
                <td>
                  <button onClick={() => open(proveedores)}>Editar</button>
                  <button onClick={() => handleDelete(proveedores.id)}>Eliminar</button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Section>
  )
}

export default Proveedor
