import React, { useState } from "react";
import { Content } from "../style/style";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../store/user";
import Logo from "../assets/user.png";

const Login = () => {
  const { setUser, user } = useUser();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const postLogin = async (e) => {
    e.preventDefault();
    const login = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        correo: correo,
        password: password
      })
    })
    if (login.ok) {
      const json = await login.json();
      if (json.error) {
        toast.error(json.error);
      }
      else {
        toast.success(json.message);
        setUser(json.data);
      }
    }
  }
  if (user) {
    return <Navigate to="/dashboard/usuario"></Navigate>
  }
  return (
    <Content>
      <section>
        <form>
          <h1>Inicio de sesión</h1>
          <img src={Logo} alt="" />
          <label>Usuario</label>
          <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={postLogin}>Ingresar</button>
        </form>
      </section>
    </Content>
  );
};

export default Login;
