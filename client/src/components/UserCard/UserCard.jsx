import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserBanner from "../UserBanner/UserBanner.jsx";

import styles from "./UserCard.module.css";

export const UserCard = () => {
  const [userSession, setUserSession] = useState();
  const { user } = useParams();
  const userData = useSelector((state) => state.userDetail);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { id } = JSON.parse(loggedUserJSON);
      setUserSession(id);
    }
  }, []);
console.log(userData)
  return (
    <div className={styles.container}>
      <UserBanner userData={userData} />
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
