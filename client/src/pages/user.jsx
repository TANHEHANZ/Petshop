import React from "react";
import Form from "../components/global/form";
import { useModal } from "../hooks/useModal";
import Modal from "../components/global/modal";
import { useGetDelete } from "../hooks/useGetDelete";
import { Section, Table } from "../style/style";

const User = () => {
  const { item, modalRef, open, close } = useModal();
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
          buscar <input type="text" />
        </label>
        <button onClick={() => open()}>Exportar</button>
        <button onClick={() => open()}>Añadir</button>
      </article>
      <Modal ref={modalRef}>
        <Form
          key={JSON.stringify(item)}
          item={item}
          fields={formData}
          route={item ? `/usuario/${item.id}` : "/usuario"}
          onSuccess={(res) => {
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
            <th>id</th>
            <th>nombre</th>
            <th>Correo</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {res?.data.map((usuario) => (
            <tr key={usuario.id}>
              <td className="pequeño">{usuario.id}</td>
              <td className="grande">{usuario.nombre}</td>
              <td className="grande">{usuario.correo}</td>
              <td>{usuario.password}</td>
              <td>
                <button onClick={() => open(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario.id)}>
                  Eliminar
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
