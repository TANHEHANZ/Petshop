import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "../../style/stylenav";

const linksData = [
  { to: "/dashboard/user", label: "Usuario" },
  { to: "/dashboard/cliente", label: "Cliente" },
  { to: "/dashboard/producto", label: "Producto" },
  { to: "/dashboard/venta", label: "Venta" },
  { to: "/dashboard/proveedor", label: "Proveedor" },
  { to: "/dashboard/compra", label: "Compra" },
];

const Nav = () => {
 

  return (
    <Navbar  >
      <ul>
        {linksData.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div><Outlet /></div>
    </Navbar>
  );
};

export default Nav;
