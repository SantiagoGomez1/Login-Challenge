import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../services/services.js";
import { getUserSession } from "../../redux/action/index";
import { Navbar } from "../Navbar/Navbar.jsx";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      getUserInfo(user, token).then((response) => setUserData(response));
      dispatch(getUserSession(user, token));
    }
  }, []);
  return (
    <>
      {userData ? (
        <div className={styles.container}>
          <Navbar userData={userData} />
          <div className={styles.containerData}>
            <p>¡Welcome!</p>
            <br />
            <img src={userData.image} className={styles.image} alt="" />
            <br />
            <p>
              {userData.name} {userData.lastName}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.containerLoading}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
};
