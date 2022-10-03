import React from "react";

import styles from "./PublicationStart.module.css";

export const PublicationStart = ({ text, image, user, date, id }) => {
  return (
    <div className={styles.container}>
      <div>
        <h1>{text}</h1>
      </div>
    </div>
  );
};
