import React, { useState } from "react";
import axios from "axios";
import styles from "./UserImage.module.css";

const UserImage = ({ setInput, input }) => {
  const [image, setImage] = useState(
    "https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png"
  );

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "HenryBank");
    await axios
      .post("https://api.cloudinary.com/v1_1/dya1hlfht/image/upload", formData)
      .then((response) => {
        setImage(response.data.url);
        setInput({ ...input, image: response.data.url });
      });
  };

  return (
    <div className={styles.container}>
      <img src={image} alt="" />
      <br />
      <label className={styles.inputFile}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files)}
        />
        Select Image
      </label>
    </div>
  );
};

export default UserImage;
