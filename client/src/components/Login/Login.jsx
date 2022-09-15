import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, validateEmail } from "../../services/services";
import logo from "../../images/Logo.png"
import styles from "./Login.module.css";

export const Login = () => {
  const [input, setInput] = useState({
    emailUser: "",
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
    const validate = await validateEmail(input.emailUser);
    if (!input.emailUser.trim()) {
      setErrors("You must enter your email.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.password.trim()) {
      setErrors("You must enter your password.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (validate === null) {
      setErrors("The email is invalid.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    }
    const data = await logIn(input);
    if (data === 401) {
      setErrors("The password or email are invalid.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else {
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate(`/start`);
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt=""
      />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.containerForm}
        autoComplete="off"
      >
        <input
          name="emailUser"
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
        {errors ? <span className={styles.error}>{errors}</span> : null}
        <br />
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
