import React, { useState } from "react";
import Form from "../components/global/form";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import { useGetDelete } from "../hooks/useGetDelete";
import { Section, Table } from "../style/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { filterBy } from "../utilities/filterBy";

const User = () => {
  const { item, modalRef, open, close } = useModal();
  const [filter, setFilter] = useState("");
  const { res, handleGet, handleDelete } = useGetDelete("usuario");
  const formData = [
    {
      name: "nombre",
      validations: {
        required: true,
      },
    },
    {
      name: "correo",
      validations: {
        required: true,
      },
    },
    {
      name: "password",
      validations: {
        required: true,
      },
    },
  ];

  return (
    <Section>
      <h2>Usuarios</h2>
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
          route={item ? `/usuario/${item.id}` : "/usuario"}
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
              <th>Correo</th>
              <th>Password</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {res?.data.filter(usuario => filterBy(usuario.nombre, filter)).map((usuario,i) => (
              <tr key={usuario.id}>
                <td className="pequeño">{i+1}</td>
                <td className="grande">{usuario.nombre}</td>
                <td className="grande">{usuario.correo}</td>
                <td>{usuario.password}</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <button onClick={() => open(usuario)}>
                    <FontAwesomeIcon icon={faPencil}/>
                  </button>
                  <button onClick={() => handleDelete(usuario.id)} style={{color:"#1877F2"}}>
                    <FontAwesomeIcon icon={faTrash} />
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

export default User;
