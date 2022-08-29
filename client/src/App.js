import { Main } from "./components/Main";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { UserProfile } from "./components/UserProfile/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/:user"} element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
