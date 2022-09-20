import React, { useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { UserCard } from "../UserCard/UserCard";
import { useParams } from "react-router-dom";
import { getUser, getUserSession } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  const { user } = useParams();
  const userSession = useSelector((state) => state.userSession);
  const userInfo = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token, id } = JSON.parse(loggedUserJSON);
      dispatch(getUserSession(id, token));
      dispatch(getUser(user, token));
    }
  },[]);

  return (
    <div className={styles.container}>
      <Navbar userData={userSession} />
      {userInfo ? (
        <UserCard userData={userInfo} />
      ) : (
        <div className={styles.containerLoading}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};
