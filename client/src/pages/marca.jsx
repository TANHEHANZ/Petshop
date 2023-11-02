import React from 'react'
import { Section, Table } from '../style/style'
import { useModal } from '../hooks/useModal';
import { useGetDelete } from '../hooks/useGetDelete';
import Form from '../components/global/form';
import Modal from '../components/global/modal';
import { toast } from 'react-toastify';

const Marca = () => {
    const { item, modalRef, open, close } = useModal();
    const { res, handleGet, handleDelete } = useGetDelete("marca");

    const formData = [
        {
            name: "nombre",
            validations: {
                required: true
            }
        }
    ]
    return (
        <Section>
        <h2>Marca</h2>
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
            route={item ? `/marca/${item.id}` : "/marca"}
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
              <th>Nro</th>
              <th>nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {res?.data.map((marca) => (
              <tr key={marca.id}>
                <td className="pequeño">{marca.id}</td>
                <td className="grande">{marca.nombre}</td>
                <td>
                  <button onClick={() => open(marca)}>Editar</button>
                  <button onClick={() => handleDelete(marca.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Section>
    )
}

export default Marca