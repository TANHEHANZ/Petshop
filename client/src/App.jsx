import { Routes, Route, HashRouter } from "react-router-dom";
import Nav from "./components/global/nav";
import User from "./pages/user";
import Login from "./pages/login";
import Cliente from "./pages/cliente";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Nav />}>
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/cliente" element={<Cliente />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
