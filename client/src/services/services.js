import axios from "axios";

export const logIn = async (credentials) => {
  try {
    const response = await axios.post(
      // "https://login-challenge-production.up.railway.app/login"
      "http://localhost:8000/login",
      credentials
    );
    return response.data;
  } catch (err) {
    return err.response.status;
  }
};

export const getUserInfo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `http://localhost:8000/user/${id}`,
      config
    );
    if (response.data) {
      return response.data;
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const newUserRegister = async (data) => {
  try {
    await axios.post("http://localhost:8000/signup", data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .trim()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};