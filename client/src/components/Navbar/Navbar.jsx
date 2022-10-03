import React from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import Menu from "../Menu/Menu";
import logo from "../../images/CONNEXION PNG.png";

import styles from "./Navbar.module.css";

export const Navbar = ({ userData }) => {
  return (
    <header className={styles.container}>
      <div className={styles.contLogSer}>
        <img className={styles.logo} src={logo} alt="" />
        <Searchbar />
      </div>
      <Menu userData={userData} />
    </header>
  );
};
