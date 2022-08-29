import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/services.js";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      getUserInfo(user, token).then((response) => setUserData(response));
    }
  }, []);

  const handleLogout = () => {
    setUserData(null);
    window.localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {userData ? (
        <div className={styles.containerData}>
          <p>¡Bienvenido!</p>
          <br />
          <img src={userData.image} alt="" />
          <br />
          <p>
            {userData.name} {userData.lastName}
          </p>
          <br />
          <button onClick={() => handleLogout()}>Log Out</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
