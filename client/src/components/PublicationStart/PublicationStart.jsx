import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import styles from "./PublicationStart.module.css";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const PublicationStart = ({ text, image, user, date, id }) => {
  const [checked, setChecked] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setChecked(e.target.checked);
    console.log(e)
    if (checked !== true) {
      console.log(id);
    }
    if (checked === true) {
      console.log(id);
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    setComment("")
  }

  return (
    <div className={styles.container}>
      <div className={styles.contPubl}>
        <div className={styles.contUser}>
          <img src={user.image} alt="" />
          <div>
            <p>
              {user.name} {user.lastName}
            </p>
            <h6>{date}</h6>
          </div>
        </div>
        <div className={styles.contText}>
          <p>{text}</p>
        </div>
        <div className={styles.contImg}>
          {image ? <img src={image} className={styles.imgPubl} alt="" /> : null}
        </div>
        <div className={styles.pubData}>
          <p>90: Likes</p>
          <p>5: Comentarios</p>
        </div>
        <hr />
        <div className={styles.likeComments}>
          <Checkbox
            {...label}
            checked={checked}
            onChange={handleChange}
            icon={<FavoriteBorder color="secondary" />}
            checkedIcon={<Favorite color="secondary" />}
          />
          <form className={styles.inputButton} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="comment"
              autoComplete="off"
              placeholder="Comment on this..."
              onChange={(e) => handleChangeComment(e)}
            />
            {!comment ? null : (
              <button className={styles.buttonSend} type="submit">
                Send
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
