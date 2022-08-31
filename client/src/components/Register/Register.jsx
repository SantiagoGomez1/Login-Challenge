import React, { useState, useEffect } from "react";
import {
  getUsers,
  newUserRegister,
  validateEmail,
} from "../../services/services.js";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export const Register = () => {
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    getUsers().then((response) => setUsers(response));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateEmail(input.email.trim());
    if (!input.name.trim()) {
      setErrors("Debes ingresar tu nombre.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.lastName.trim()) {
      setErrors("Debes ingresar tu apellido.");
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
    } else if (input.password.trim().length < 8) {
      setErrors("La contraseña debe ser de 8 digitos.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!passwordRepeat.trim()) {
      setErrors("Debes repetir tu constraseña.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (input.password.trim() !== passwordRepeat.trim()) {
      setErrors("Las contraseñas no coinciden.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (users.find((u) => u.email === input.email)) {
      setErrors("El E-Mail ya esta registrado.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.email.trim()) {
      setErrors("Debes ingresar tu email.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (validate === null) {
      setErrors("El formato del email es invalido.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    }
    await newUserRegister(input);
    setInput({
      name: "",
      lastName: "",
      password: "",
      email: "",
      image: "",
    });
    setPasswordRepeat("");
    alert("Registrado correctamente !");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <img
        src="https://images.vexels.com/media/users/3/224282/isolated/preview/c09e11bba1766e8412ce116e1afb4a58-logo-de-lineas-abstractas-violetas.png"
        alt=""
      />
      <form
        className={styles.containerForm}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          name="name"
          value={input.data}
          placeholder="Name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          name="lastName"
          value={input.data}
          placeholder="Last Name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          name="password"
          type="password"
          value={input.data}
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          name="passwordRepeat"
          type="password"
          value={input.data}
          placeholder="Repeat Password"
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
        <br />
        <input
          name="email"
          value={input.data}
          placeholder="E-Mail"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          name="image"
          value={input.data}
          placeholder="Image URL"
          onChange={(e) => handleChange(e)}
        />
        <br />
        {errors ? <span className={styles.error}>{errors}</span> : null}
        <br />
        <button type="submit">Register</button>
        <br />
        <button onClick={() => navigate("/")}>Back to Login</button>
      </form>
    </div>
  );
};
