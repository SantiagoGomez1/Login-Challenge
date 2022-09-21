import React from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useDispatch } from "react-redux";
import { putBanner } from "../../redux/action";

import styles from "./UserBanner.module.css";

const UserBanner = ({ userData, token }) => {
  const dispatch = useDispatch();

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "HenryBank");
    await axios
      .post("https://api.cloudinary.com/v1_1/dya1hlfht/image/upload", formData)
      .then(async (response) => {
        dispatch(await putBanner(userData.id, response.data.url, token));
      });
  };

  return (
    <div className={styles.container}>
      <img src={userData.banner} alt="" className={styles.imgUser} />
      <div className={styles.buttonCamera}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => uploadImage(e.target.files)}
          />
          <PhotoCamera />
        </IconButton>
      </div>
    </div>
  );
};

export default UserBanner;
