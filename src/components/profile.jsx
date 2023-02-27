import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./profileContext";
import styles from "./profile.module.css";
import About from "./aboutUser";
import Expertise from "./userExpertise";
import Education from "./userEducation";
import FieldsOfInterest from "./userFieldOfInterest";
import Experience from "./userExperience";
// import Activity from "./userActivity";
// import Contribution from "./userContribution";
import { useParams } from "react-router";
import { CSSTransition } from "react-transition-group";
import "./transition.css";
import EditProfile from "./editProfile";
import { Button } from "rsuite";
import { UserContext } from "./userContext";

const Profile = () => {
  const { userId } = useParams();
  // console.log("Profile of -> ", userId);
  const currentUser = sessionStorage.getItem("userId");
  const [followToggle, setFollowToggle] = useState();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  // const [userFollowings, setUserFollowings] = useState([]);
  // const [userFollowers, setUserFollowers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (isModalOpen === true) {
      return (
        <EditProfile
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          profileData={{
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
          }}
        />
      );
    }
  };
  const {
    firstName,
    lastName,
    email,
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
    fetchProfileData,
  } = useContext(ProfileContext);
  const {
    followUser,
    unfollowUser,
    // followers,
    // followings,
    getFollowersFollowings,
  } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      await fetchProfileData(userId);
      const response = await getFollowersFollowings(userId);
      setFollowers(response.followers);
      setFollowings(response.followings);
      { console.log("followers -> ", followers) };
      { console.log("followings -> ", followings) };

      // console.log(currentUser);
      let found = false;
      for (const element of response.followers) {
        console.log(element);
        if (currentUser === element.userId) {
          found = true;
          break;
        }
      }
      console.log("Found : ", found);
      if (userId === currentUser) {
        setFollowToggle(null);
      } else {
        if (found) {
          setFollowToggle(true);
        } else {
          setFollowToggle(false);
        }
      }
    }
    fetchData();
  }, []);
  const follow = async () => {
    await followUser(currentUser, userId);
    window.location.reload();
    // setFollowToggle(!followToggle);

  };
  const unfollow = async () => {
    await unfollowUser(currentUser, userId);
    // setFollowToggle(!followToggle);
    window.location.reload();
    
  };
  const showFollowBtn = () => {
    if (followToggle !== null) {
      return (
        <Button
          onClick={() => {
            if (followToggle) {
              unfollow();
            } else {
              follow();
            }
          }}
          appearance="primary"
        >
          {followToggle ? "Unfollow" : "Follow"}
        </Button>
      );
    }
  };
  const displayProfileImage = () => {
    if (profileImage !== "") {
      return <img id={styles.profileImage} src={profileImage} alt="" />;
    } else {
      return (
        <img
          id={styles.profileImage}
          src="https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg"
          alt=""
        />
      );
    }
  };
  return (
    <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
      <div className={styles.container}>
        <div className={styles.basicInfo}>
          <div className={styles.profileImageContainer}>
            {displayProfileImage()}
          </div>

          <div className={styles.info}>
            <div id={styles.username}>{`${firstName} ${lastName}`}</div>

            <div id={styles.email}>{email}</div>

            <div id={styles.website}>{website}</div>
          </div>
          <div className={styles.followContainer}>
            <div className={styles.followers}>
              

              <span>Followers</span>
              <span>{followers.length}</span>
            </div>
            <div className={styles.followings}>
              <span>Following</span>
              <span>{followings.length??0}</span>
            </div>
            {showFollowBtn()}
          </div>
          <div className={styles.btns}>
            {currentUser === userId ? (
              <span
                className={styles.btn}
                onClick={() => {
                  setIsModalOpen(true);
                }}
                id={styles.editProfile}
              >
                <i className="fas fa-user-edit"></i>
              </span>
            ) : null}
            <a href={`/${userId}/post/all`}>
              <span className={styles.viewPost}>View Posts</span>
            </a>
          </div>
          {showModal()}
        </div>
        <About sex={sex} about={about} />
        {/* <Contribution /> */}
        <Expertise expertises={expertises} />
        <FieldsOfInterest fieldsOfInterests={fieldsOfInterests} />
        <Experience experiences={experiences} />
        <Education
          currentQualification={currentQualification}
          college={college}
          highSchool={highSchool}
        />
        {/* <Activity /> */}
      </div>
    </CSSTransition>
  );
};

export default Profile;
