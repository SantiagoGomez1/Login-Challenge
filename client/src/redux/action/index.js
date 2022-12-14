import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_SESSION = "GET_USER_SESSION";
export const GET_ALL_PUBLICATIONS = "GET_ALL_PUBLICATIONS";

export const PUT_USER_BANNER = "PUT_USER_BANNER";

export const POST_PUBLICATION = "POST_PUBLICATION";

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

export const getAllPublications = (token) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`http://localhost:8000/publications`, config)
    .then((response) => {
      dispatch({ type: "GET_ALL_PUBLICATIONS", payload: response.data });
    });
};

export const putBanner = async (id, banner, token) => {
  const body = {
    id: id,
    banner: banner,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(`http://localhost:8000/user/banner`, body, config);
};

export const postPublication = async (input, userData, token) => {
  const body = {
    text: input.text,
    image: input.image,
    userId: userData.id,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post("http://localhost:8000/user/publication", body, config);
};
