import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import Nav from "./components/global/nav";
import User from "./pages/user";
import Login from "./pages/login";
import Cliente from "./pages/cliente";
import Home from "./pages/home";
import Producto from "./pages/producto";
import Venta from "./pages/venta";
import Proveedor from "./pages/proveedor";
import Compra from "./pages/compra";

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Nav />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/cliente" element={<Cliente />} />
          <Route path="/dashboard/producto" element={<Producto />} />
          <Route path="/dashboard/venta" element={<Venta />} />
          <Route path="/dashboard/proveedor" element={<Proveedor />} />
          <Route path="/dashboard/compra" element={<Compra />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
