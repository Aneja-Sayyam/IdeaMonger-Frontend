import React, { useState,createContext } from 'react';

export const ProfileContext = createContext();

const ProfileContextProvider = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [about, setAbout] = useState("");
  const [sex, setSex] = useState("");
  const [expertises, setExpertises] = useState("");
  const [experiences, setExperiences] = useState("");
  const [fieldsOfInterests, setFieldsOfInterests] = useState("");
  const [currentQualification, setCurrentQualification] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [college, setCollege] = useState("");
  
  async function fetchProfileData(userId) {
    console.log("Profile of -> ", userId);
    const body = {
      userId: userId,
    };
    const url = "http://localhost:3000/api/profile/findProfileById";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    setProfile(result);
  };
  const getProfileImage = async (userId) => {
    const body = {
      userId: userId
    };
    const url = "http://localhost:3000/api/profile/getProfileImageByUserId";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  }
  async function updateProfile(
    updateProfileImage,
    updateSex,
    updateAbout,
    updateWebsite,
    updateExperiences,
    updateExpertises,
    updateFieldsOfInterests,
    updateCurrentQualification,
    updateCollege,
    updateHighSchool
  ) {
    const userId = sessionStorage.getItem("userId");
    const body = new FormData();
    body.append("userId",userId);
    body.append("profileImage" , updateProfileImage);
    body.append("sex", updateSex);
    body.append("about" , updateAbout);
    body.append("website" , updateWebsite);
    body.append("experience" , updateExperiences);
    body.append("expertise" , updateExpertises);
    body.append("fieldOfInterests" , updateFieldsOfInterests);
    body.append("currentQualification" , updateCurrentQualification);
    body.append("college" ,updateCollege);
    body.append("highSchool" , updateHighSchool);

    const url = "http://localhost:3000/api/profile/updateProfileById";
    const response = await fetch(url, {
      method: "POST",
      body: body,
    });
    const result = await response.json();
    console.log(result);
  };
  async function setProfile(Profile) {
    setFirstName(Profile.User.firstName);
    setLastName(Profile.User.lastName);
    setEmail(Profile.User.email);
    setAbout(Profile.about);
    setSex(Profile.sex);
    setWebsite(Profile.website);
    setExperiences(Profile.experience);
    setExpertises(Profile.expertise);
    setFieldsOfInterests(Profile.fieldOfInterests);
    setProfileImage(Profile.profileImage);
    setCurrentQualification(Profile.currentQualification);
    setCollege(Profile.college);
    setHighSchool(Profile.highSchool);
  }
  return (
    <ProfileContext.Provider value={{ firstName, lastName, email, website, profileImage, sex, about, experiences, expertises, fieldsOfInterests, currentQualification, college, highSchool, fetchProfileData,updateProfile,getProfileImage}}>
      {props.children}
    </ProfileContext.Provider>
  );
};
 
export default ProfileContextProvider;