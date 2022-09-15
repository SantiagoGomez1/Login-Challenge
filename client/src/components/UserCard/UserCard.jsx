import React from "react";

import styles from "./UserCard.module.css";

export const UserCard = ({ userData }) => {
  return (
    <>
      <div className={styles.containerData}>
        <p>¡Welcome!</p>
        <br />
        <img src={userData.image} className={styles.image} alt="" />
        <br />
        <p>
          {userData.name} {userData.lastName}
        </p>
      </div>
    </>
  );
};
