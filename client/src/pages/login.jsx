import React from "react";
import { Content } from "../style/style";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/dashboard/usuario");
  }
  return (
    <Content>
      <section>
        <form>
          <h1>Inicio de secion</h1>
          <label>Usuario</label>
          <input type="text" />
          <label>Contraseña</label>
          <input type="password" />
          <label>Confirmar contraseña</label>
          <input type="password" />
          <button onClick={handleLogin}>Ingresar</button>
        </form>
      </section>
    </Content>
  );
};

export default Login;
