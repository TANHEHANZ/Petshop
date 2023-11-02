import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";

const linksData = [
  { to: "/dashboard/usuario", label: "Usuario", icon: faUser },
  { to: "/dashboard/cliente", label: "Cliente", icon: faUsers },
  { to: "/dashboard/producto", label: "Producto", icon: faShoppingCart },
  { to: "/dashboard/venta", label: "Venta", icon: faDollarSign },
  { to: "/dashboard/proveedor", label: "Proveedor", icon: faBuilding },
  { to: "/dashboard/compra", label: "Compra", icon: faShoppingBag },
];

const Nav = () => {
  const [activad, setActivad] = useState(true);
  return (
    <Navbar>
      <ul className="nav">
        {linksData.map((link, index) => (
          <li key={index} className="slide-in-icon">
            <Link to={link.to}>
              <FontAwesomeIcon icon={link.icon} /> {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {activad ? (
        <ul className="nav780">
          <button onClick={() => setActivad(!activad)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {linksData.map((link, index) => (
            <li key={index} className="slide-in-icon">
              <Link to={link.to}>
                <FontAwesomeIcon icon={link.icon} /> {link.label}
              </Link>
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
