import React from "react";
import { Content } from "../style/style";

const Login = () => {
  return (
    <Content>
      <section>
        <form>
          <h1>Inicio de Sencion</h1>
          <label>Usuario</label>
          <input type="text" />
          <label>Contraseña</label>
          <input type="password" />
          <label>Confirmar contraseña</label>
          <input type="password" />
          <button>Ingresar</button>
        </form>
     <div></div>
      </section>
    </Content>
  );
};

export default Login;
