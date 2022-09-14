import React from "react";
import styles from "./Searchbar.module.css";

export const Searchbar = () => {
  return (
    <div className={styles.container}>
      <div>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};
