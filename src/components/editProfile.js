import React, { useState, useContext } from "react";
import Modal from "react-modal";
import styles from "./form.module.css";
import { ProfileContext } from "./profileContext";

const EditProfile = (props) => {
  let fileInput = null;
  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(47, 47, 47, 0.685)",
    },
    content: {
      position: "absolute",
      top: "8vh",
      left: "37vw",
      right: "37vw",
      bottom: "10vh",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
  // console.log("modal opened");
  Modal.setAppElement("#root");
  const {
    website,
    profileImage,
    sex,
    about,
    experiences,
    expertises,
    fieldsOfInterests,
    currentQualification,
    college,
    highSchool,
    updateProfile,
  } = useContext(ProfileContext);

  const [updateProfileImage, setUpdateProfileImage] = useState(profileImage);
  const [updateWebsite, setUpdateWebsite] = useState(website);
  const [updateSex, setUpdateSex] = useState(sex);
  const [updateAbout, setupdateAbout] = useState(about);
  const [updateExperiences, setUpdateExperiences] = useState(experiences);
  const [updateExpertises, setUpdateExpertises] = useState(expertises);
  const [updateFieldsOfInterests, setUpdateFieldsOfInterests] = useState(
    fieldsOfInterests
  );
  const [updateCurrentQualification, setUpdateCurrentQualification] = useState(
    currentQualification
  );
  const [updateCollege, setUpdateCollege] = useState(college);
  const [updateHighSchool, setUpdateHighSchool] = useState(highSchool);

  const selectFile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file !== undefined) {
      setUpdateProfileImage(file);
    }
  };
    const updateProfileHandler= ()=>{
      updateProfile(updateProfileImage, updateSex, updateAbout, updateWebsite, updateExperiences, updateExpertises, updateFieldsOfInterests, updateCurrentQualification, updateCollege, updateHighSchool);
      window.location.reload();
    }
    const displayProfileImage = () => {
        let image = updateProfileImage;
        if (typeof (image) !== "string") {
          image = URL.createObjectURL(updateProfileImage);
        };
        return (
          <div className={styles.updateProfileImageContainer}>
            <img
              onClick={() => fileInput.click()}
              className={styles.updateProfileImage}
              src={image}
              alt=""
            />
          </div>
        );
  };
  return (
    <Modal
      isOpen={props.isModalOpen}
      style={modalStyles}
      onRequestClose={() => props.setIsModalOpen(false)}
    >
      <h1>Edit Profile</h1>
      {displayProfileImage()}
      <input
        onChange={selectFile}
        type="file"
        ref={(ref) => {
          fileInput = ref;
        }}
        style={{ display: "none" }}
      />

      <div className={styles.editProfileInputs}>
        <input
          type="text"
          placeholder="Website"
          value={updateWebsite}
          className={styles.input}
          onChange={(e) => {
            setUpdateWebsite(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Sex"
          value={updateSex}
          className={styles.input}
          onChange={(e) => {
            setUpdateSex(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="About"
          value={updateAbout}
          className={styles.input}
          onChange={(e) => {
            setupdateAbout(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Current Qualification"
          value={updateCurrentQualification}
          className={styles.input}
          onChange={(e) => {
            setUpdateCurrentQualification(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="College"
          value={updateCollege}
          className={styles.input}
          onChange={(e) => {
            setUpdateCollege(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="High School"
          value={updateHighSchool}
          className={styles.input}
          onChange={(e) => {
            setUpdateHighSchool(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Experiences"
          value={updateExperiences}
          className={styles.input}
          onChange={(e) => {
            setUpdateExperiences(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Expertises"
          value={updateExpertises}
          className={styles.input}
          onChange={(e) => {
            setUpdateExpertises(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Fields Of Interest"
          value={updateFieldsOfInterests}
          className={styles.input}
          onChange={(e) => {
            setUpdateFieldsOfInterests(e.target.value);
          }}
        />
      </div>
      <div onClick={updateProfileHandler} className={styles.submitBtn}>Update Profile</div>
    </Modal>
  );
};

export default EditProfile;
