import React, { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import styles from "./UserBanner.module.css";

const UserBanner = ({ userData }) => {
  const [image, setImage] = useState(
    userData.banner ||
      "https://img.freepik.com/vector-gratis/fondo-pantalla-textura-granulada-degradado-degradado_23-2148968811.jpg"
  );

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "HenryBank");
    await axios
      .post("https://api.cloudinary.com/v1_1/dya1hlfht/image/upload", formData)
      .then((response) => {
        setImage(response.data.url);
      });
  };

  return (
    <div className={styles.container}>
      <img src={image} alt="" className={styles.imgUser} />
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
