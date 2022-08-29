import React from "react";

import { Login } from "./Login/Login";

import styles from "./Main.module.css";

export const Main = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};
