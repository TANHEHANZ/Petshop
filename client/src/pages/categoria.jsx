import React, { useState } from 'react'
import { Section, Table } from '../style/style'
import { useModal } from '../hooks/useModal';
import { useGetDelete } from '../hooks/useGetDelete';
import Modal from '../components/global/modal';
import Form from '../components/global/form';
import { toast } from "react-toastify";
import { filterBy } from '../utilities/filterBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
const Categoria = () => {
    const { item, modalRef, open, close } = useModal();
    const { res, handleGet, handleDelete } = useGetDelete("categoria");
  const [filter, setFilter] = useState("");

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
        <h2>Categoria</h2>
        <article>
          <label>
            <p>Buscar por nombre</p> <input value={filter} onChange={e => setFilter(e.target.value)} type="text" />
          </label>     
          <button onClick={() => open()}>Añadir</button>
        </article>
        <Modal ref={modalRef}>
          <Form
            key={JSON.stringify(item)}
            item={item}
            fields={formData}
            route={item ? `/categoria/${item.id}` : "/categoria"}
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
            {res?.data.filter(categoria => filterBy(categoria.nombre, filter)).map((categoria,i) => (
              <tr key={categoria.id}>
              <td className="pequeño">{i+1}</td>
                <td className="grande">{categoria.nombre}</td>
                <td>
                  <button onClick={() => open(categoria)}><FontAwesomeIcon icon={faPencil}/></button>
                  <button onClick={() => handleDelete(categoria.id)}>
                  <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#1877F2" }}
                    />
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

export default Categoria