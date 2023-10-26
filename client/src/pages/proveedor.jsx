import React from 'react'
import { Section, Table } from '../style/style';
import Modal from '../components/global/modal';
import Form from '../components/global/form';
import { dataproveedores } from '../data/proveedores';

const Proveedor = () => {
  return (
    <Section>
    <h2>Proveedor</h2>
   <article> 
      <label >buscar <input type="text" /></label> 
   <button>Exportar</button>
   <button>Añadir</button>
   </article>
   {/* <Modal>
     {/* <Form
      //  key={JSON.stringify(item)}
      //  item={item}
      //  fields={formData}
      //  route={item ? `/cliente/${item.ci}` : "/cliente"}
      //  onSuccess={res => {
      //    alert(res.message);
      //    handleGet();
      //    close();
      //  }}
      si tu no estas aqui ... sabras jajaj 
     /> */}
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
  {dataproveedores.map((proveedores) => (
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
    <button onClick={() => handleDelete(proveedores.ci)}>Eliminar</button>
       
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
