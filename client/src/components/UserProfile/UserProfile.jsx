import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/services.js";
import styles from "./UserProfile.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const UserProfile = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      getUserInfo(user, token).then((response) => setUserData(response));
    }
  }, []);

  const handleLogout = () => {
    MySwal.fire({
      title: "¿Are you sure?",
      icon: "warning",
      iconColor:"#5800FF",
      background:"#1B1A17",
      color:"#FFFF",
      showCancelButton: true,
      confirmButtonColor: "#5800FF",
      cancelButtonColor: "#5800FF",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserData(null);
        window.localStorage.removeItem("loggedUser");
        navigate("/");
      }
    });
  };

  return (
    <div className={styles.container}>
      {userData ? (
        <div className={styles.containerData}>
          <p>¡Welcome to!</p>
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
