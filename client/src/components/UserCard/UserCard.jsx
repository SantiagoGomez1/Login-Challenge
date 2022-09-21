import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserBanner from "../UserBanner/UserBanner.jsx";
import { getUser } from "../../redux/action/index";

import styles from "./UserCard.module.css";

export const UserCard = () => {
  const [userSession, setUserSession] = useState();
  const [token, setToken] = useState();
  const { user } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { id, token } = JSON.parse(loggedUserJSON);
      setUserSession(id, token);
      setToken(token);
      dispatch(getUser(user, token));
    }
  }, [userData]);

  return (
    <div className={styles.container}>
      <UserBanner userData={userData} token={token} />
      <div className={styles.containerData}>
        <img src={userData.image} className={styles.image} alt="" />
        <p>
          {userData.name} {userData.lastName}
        </p>
        {user === userSession ? null : <p>Seguir</p>}
        <div className={styles.followersData}>
          <p>{userData.followers?.length} Followers</p>
          <p>{userData.following?.length} Following</p>
        </div>
      </div>
    </div>
  );
};
