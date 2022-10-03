import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useSelector, useDispatch } from "react-redux";
import { postPublication } from "../../redux/action";

import styles from "./Publish.module.css";
import axios from "axios";

export const Publish = ({ token }) => {
  const [uploadImg, setUploadImg] = useState("");
  const [input, setInput] = useState({
    text: "",
    image: "",
  });

  const userData = useSelector((state) => state.userSession);
  const dispatch = useDispatch();

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "HenryBank");
    await axios
      .post("https://api.cloudinary.com/v1_1/dya1hlfht/image/upload", formData)
      .then((response) => {
        setUploadImg(response.data.url);
        setInput({ ...input, image: response.data.url });
      });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitPost = () => {
    if (!input.text.trim().length) {
      return;
    }
    dispatch(postPublication(input, userData, token));
  };

  return (
    <div className={styles.container}>
      <div className={styles.publish}>
        <div className={styles.inputPub}>
          <img src={userData?.image} className={styles.userImg} alt="" />
          <input
            autoComplete="off"
            type="text"
            name="text"
            placeholder="What are you thinking?"
            onChange={(e) => handleChange(e)}
          />
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
        <div className={styles.uploadImgCont}>
          {uploadImg ? (
            <img src={uploadImg} className={styles.uploadImg} alt="" />
          ) : null}
        </div>
        <div className={styles.sendPub}>
          <button onClick={submitPost}>Post</button>
        </div>
      </div>
    </div>
  );
};
