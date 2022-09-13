import React, { useState, useEffect } from "react";
import {
  getUsers,
  newUserRegister,
  validateEmail,
} from "../../services/services.js";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import UserImage from "../UserImage/UserImage.jsx";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

  const MySwal = withReactContent(Swal)

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
      setErrors("You must enter your name.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.lastName.trim()) {
      setErrors("You must enter your last name.");
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
    } else if (input.password.trim().length < 8) {
      setErrors("The password must be 8 digits.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!passwordRepeat.trim()) {
      setErrors("You must repeat your password.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (input.password.trim() !== passwordRepeat.trim()) {
      setErrors("Passwords do not match.")
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (users.find((u) => u.email === input.email)) {
      setErrors("The email is already registered.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (!input.email.trim()) {
      setErrors("You must enter your email.");
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    } else if (validate === null) {
      setErrors("The email format is invalid.");
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
    MySwal.fire({
      position: 'center',
      icon: 'success',
      iconColor:"#5800FF",
      background:"#1B1A17",
      color:"#FFFF",
      title: 'You have successfully registered.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      navigate("/");
    }, 1700);
  };

  return (
    <div className={styles.container}>
      <UserImage setInput={setInput} />
      <br />
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
        {errors ? <span className={styles.error}>{errors}</span> : null}
        <br />
        <button type="submit">Register</button>
        <br />
        <button onClick={() => navigate("/")}>Back to Login</button>
      </form>
    </div>
  );
};
