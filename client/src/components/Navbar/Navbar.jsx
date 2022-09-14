import React from "react";

import { Searchbar } from "../Searchbar/Searchbar";
import Menu from "../Menu/Menu";

import styles from "./Navbar.module.css";
import logo from "../../images/CONNEXION PNG.png";

export const Navbar = ({ userData }) => {
  return (
    <nav className={styles.container}>
      <img className={styles.logo} src={logo} alt="" />
      <Searchbar />
      <Menu userData={userData} />
    </nav>
  );
};
