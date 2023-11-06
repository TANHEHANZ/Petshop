import React, { useState } from "react";
import { Link, Outlet, Navigate, NavLink } from "react-router-dom";
import { Navbar } from "../../style/stylenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faShoppingCart,
  faDollarSign,
  faBuilding,
  faShoppingBag,
  faTimes,
  faBars,
  faLock,
  faBox,
  faDoorClosed
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../store/user";
const linksData = [
  { to: "/dashboard/usuario", label: "Usuario", icon: faUser },
  { to: "/dashboard/venta", label: "Venta", icon: faDollarSign },
  { to: "/dashboard/cliente", label: "Cliente", icon: faUsers },
  { to: "/dashboard/producto", label: "Producto", icon: faShoppingCart },
  { to: "/dashboard/categoria", label: "Categoria", icon: faBox },
  { to: "/dashboard/marca", label: "Marca", icon: faLock },
  { to: "/dashboard/proveedor", label: "Proveedor", icon: faBuilding },
  { to: "/dashboard/compra", label: "Compra", icon: faShoppingBag }
];
const Nav = () => {
  const { setUser, user, logout } = useUser();
  const [activad, setActivad] = useState(true);

  const handlerLogout = () => {
    logout();
  }
  if (!user) {
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <Navbar>
      <ul className="nav">
      <h1>Petshop</h1>
        {linksData.map((link, index) => (
          <li key={index} className="slide-in-icon">
            <NavLink to={link.to}>
              <FontAwesomeIcon icon={link.icon} /> {link.label}
            </NavLink>
          </li>
        ))}
        <li className="slide-in-icon">
          <Link onClick={handlerLogout} to={"/"}>
            <FontAwesomeIcon icon={faDoorClosed} />
            Logout
          </Link>
        </li>

      </ul>
      {activad ? (
        <ul className="nav780">
          <button onClick={() => setActivad(!activad)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {linksData.map((link, index) => (
            <li key={index} className="slide-in-icon">
              <NavLink to={link.to}>
                <FontAwesomeIcon icon={link.icon} /> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <div className=" topnav">
          <h1>PetShop</h1>
          <button onClick={() => setActivad(!activad)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}

      <div>
        <Outlet />
      </div>
    </Navbar>
  );
};

export default Nav;
