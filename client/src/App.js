import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { Start } from "./components/Start/Start";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/start"} element={<Start />} />
        <Route path={"/:user"} element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
