import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_SESSION = "GET_USER_SESSION";

export const getAllUsers = () => (dispatch) => {
  return axios.get("http://localhost:8000/users").then((response) => {
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  });
};

export const getUserSession = (id, token) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`http://localhost:8000/user/${id}`, config)
    .then((response) => {
      dispatch({ type: "GET_USER_SESSION", payload: response.data });
    });
};

export const getUser = (id, token) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`http://localhost:8000/user/${id}`, config)
    .then((response) => {
      dispatch({ type: "GET_USER", payload: response.data });
    });
};
