import { Routes, Route, HashRouter } from "react-router-dom";
import Nav from "./components/nav";
import User from "./pages/user";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <HashRouter>
  
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Nav />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/user" element={<User />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
