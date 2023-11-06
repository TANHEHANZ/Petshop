import React, { useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
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
  faDoorClosed
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../store/user";
const linksData = [
  { to: "/dashboard/usuario", label: "Usuario", icon: faUser },
  { to: "/dashboard/cliente", label: "Cliente", icon: faUsers },
  { to: "/dashboard/producto", label: "Producto", icon: faShoppingCart },
  { to: "/dashboard/venta", label: "Venta", icon: faDollarSign },
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
        {linksData.map((link, index) => (
          <li key={index} className="slide-in-icon">
            <Link to={link.to}>
              <FontAwesomeIcon icon={link.icon} /> {link.label}
            </Link>
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
