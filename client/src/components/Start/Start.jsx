import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession } from "../../redux/action";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Start.module.css";

export const Start = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userSession);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token, id } = JSON.parse(loggedUserJSON);
      dispatch(getUserSession(id, token));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Navbar userData={userData} />
    </div>
  );
};
