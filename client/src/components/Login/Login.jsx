import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, validateEmail } from "../../services/services";
import styles from "./Login.module.css";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateEmail(input.email);
    if (!input.email.trim()) {
      setErrors("Debes ingresar tu email.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.password.trim()) {
      setErrors("Debes ingresar tu constraseña.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (validate === null) {
      setErrors("El email es invalido.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    }
    const data = await logIn(input);
    if (data === 401) {
      setErrors("La contraseña o email son invalidos.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else {
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate(`/${data.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <img
        src="https://images.vexels.com/media/users/3/224282/isolated/preview/c09e11bba1766e8412ce116e1afb4a58-logo-de-lineas-abstractas-violetas.png"
        alt=""
      />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.containerForm}
        autoComplete="off"
      >
        <input
          name="email"
          value={input.name}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={input.name}
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <br />
        {errors ? <span>{errors}</span> : null}
        <br />
        <button type="submit">Login</button>
        <br />
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
};
