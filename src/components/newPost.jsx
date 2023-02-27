import React, { useState } from "react";
import styles from "./newPost.module.css";
import { programmingLanguages } from "../informationComponents/programmingLanguages";
import { technologies } from "../informationComponents/technologies";
import { Button, Input, InputPicker, Panel } from "rsuite";

// import Select from "react-select";
// import "./reactSelectStyle.css";

const NewPost = (props) => {
  const [newPostImage, setNewPostImage] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [technology, setTechnology] = useState("");
  let fileInput = null;

  const selectFile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file !== undefined) {
      setNewPostImage(file);
    }
  };
  const onSubmit = async () => {
    // console.log(selectedOption);
    const techs = technology + " , " + language;
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    const data = new FormData();
    data.append("postDescription", description);
    data.append("imageSource", newPostImage);
    data.append("mainTechUsed", techs);
    data.append("userId", userId);

    const url = "http://localhost:3000/api/post/createPost";
    await fetch(url, {
      method: "POST",
      body: data,
    });
    window.location.reload();
  };
  const displayImage = () => {
    if (newPostImage !== "") {
      const image = URL.createObjectURL(newPostImage);
      return (
        <div className={styles.newPostImageContainer}>
          <span
            onClick={() => {
              setNewPostImage("");
            }}
            className={styles.removeBtn}
          >
            &times;
          </span>
          <img className={styles.newPostImage} src={image} alt="" />
        </div>
      );
    }
  };
  return (
    <Panel
      shaded
      bodyFill
      style={{
        backgroundColor: "white",
        width: 600,
        position: "-webkit-sticky",
      }}
      collapsible
      header="Add New Post"
    >
      <div className={styles.newPostContainer}>
        {displayImage()}
        <div className={styles.inputValues}>
          <Input
            componentClass="textarea"
            rows={3}
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
            style={{ resize: "none" }}
            placeholder="Add a Description..."
          />
          <InputPicker
            data={technologies}
            placeholder="Choose Main Technology Used"
            value={technology}
            valueKey="label"
            onChange={(value) => {
              setTechnology(value);
            }}
            style={{ width: "100%", zIndex: 0 }}
          />
          <InputPicker
            data={programmingLanguages}
            placeholder="Choose Main Language Used"
            value={language}
            valueKey="label"
            onChange={(value) => {
              setLanguage(value);
            }}
            style={{ width: "100%", zIndex: 0 }}
          />
        </div>
        <div className={styles.fileType}>
          <input
            onChange={selectFile}
            type="file"
            ref={(ref) => {
              fileInput = ref;
            }}
            style={{ display: "none" }}
          />
          <Button
            onClick={() => fileInput.click()}
            appearance="default"
            color="cyan"
          >
            Image
          </Button>
        </div>
        <Button
          style={{alignSelf:"center",margin:"10px 0"}}
          onClick={onSubmit}
          appearance="default"
          color="cyan"
        >
          Add Post
        </Button>
      </div>
    </Panel>
  );
};

export default NewPost;

{
  /* <div className={styles.newPostContainer}>
      <div className={styles.header}>
        <img id={styles.profilePic} src={props.profileImage} alt="" />
        <div className={styles.username}>{props.username}</div>
      </div>
      {displayImage()}
      <div className={styles.inputValues}>
        <Input
          componentClass="textarea"
          rows={3}
          value={description}
          onChange={(value)=>{setDescription(value)}}
          style={{ resize: "none" }}
          placeholder="Add a Description..."
        />
        <InputPicker
          data={technologies}
          placeholder="Choose Main Technology Used"
          value={technology}
          valueKey="label"
          onChange={(value) =>
          { setTechnology(value);}}
          style={{ width: "100%" }}
        />
        <InputPicker
          data={programmingLanguages}
          placeholder="Choose Main Language Used"
          value={language}
          valueKey="label"
          onChange={(value)=>{setLanguage(value)}}
          style={{ width: "100%" }}
        />
      </div>
      <div className={styles.fileType}>
        <input
          onChange={selectFile}
          type="file"
          ref={(ref) => {
            fileInput = ref;
          }}
          style={{ display: "none" }}
        />
        <span onClick={() => fileInput.click()} className={styles.btn}>
          Image
        </span>
      </div>
      <span onClick={onSubmit} className={styles.btn}>
        Add Post
      </span>
    </div> */
}
