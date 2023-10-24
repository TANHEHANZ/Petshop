import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <Navbar>
      <ul>
        <li><Link to="/dashboard/user">Usuario</Link></li>
        <li><Link to="/dashboard/cliente">Cliente</Link></li>
        <li><Link to="/dashboard/producto">Producto</Link></li>
        <li><Link to="/dashboard/venta">Venta</Link></li>
        <li><Link to="/dashboard/detalleventa">DetalleVenta</Link></li>
        <li><Link to="/dashboard/proveedor">Proveedor</Link></li>
        <li><Link to="/dashboard/compra">Compra</Link></li>
        <li><Link to="/dashboard/detallecompra">DetalleCompra</Link></li>
      </ul>
      <Outlet />
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav`
  display: flex;
`;