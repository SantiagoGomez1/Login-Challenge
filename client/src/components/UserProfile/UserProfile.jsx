import React, { useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { UserCard } from "../UserCard/UserCard";
import { useParams } from "react-router-dom";
import { getUserSession } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  const { user } = useParams();
  const userData = useSelector((state) => state.userSession);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      dispatch(getUserSession(user, token));
    }
  }, []);

  return (
    <div>
      <Navbar userData={userData} />
      {userData ? (
        <UserCard userData={userData} />
      ) : (
        <div className={styles.containerLoading}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};
