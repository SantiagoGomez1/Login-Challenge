import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublications, getUserSession } from "../../redux/action";

import { PublicationStart } from "../PublicationStart/PublicationStart";
import { Publish } from "../Publish/Publish";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Start.module.css";

import CircularProgress from "@mui/material/CircularProgress";

export const Start = () => {
  const [token, setToken] = useState("");
  const userData = useSelector((state) => state.userSession);
  const allPublications = useSelector((state) => state.allPublications);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const { token, id } = JSON.parse(loggedUserJSON);
      dispatch(getUserSession(id, token));
      dispatch(getAllPublications(token));
      setToken(token);
    }
  }, [allPublications]);

  return (
    <div className={styles.container}>
      <Navbar userData={userData} />
      <Publish userId={userData.id} token={token} />
      <div className={styles.contPubl}>
        {allPublications ? (
          allPublications.map((p) => (
            <PublicationStart
              key={p.id}
              id={p.id}
              text={p.text}
              image={p.image}
              user={p.user}
              date={p.date}
            />
          ))
        ) : (
          <div className={styles.containerLoading}>
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </div>
  );
};
