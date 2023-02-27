import React from "react";
import { Panel } from "rsuite";
import styles from "./event.module.css";
const Event = ({
  username,
  profileImage,
  thumbnail,
  aboutEvent,
  topic,
  title,
  city,
  state,
  address,
  eventStartDate,
  eventEndDate,
  registrationStartDate,
  registrationEndDate,
  startTime,
  endTime,
}) => {
  return (
    <Panel
      bodyFill
      style={{
        width: 600,
        background: "white",
        marginTop: 15,
        marginBottom: 5,
      }}
      shaded
    >
      <div className={styles.container}>
        <div className={styles.thumbnailContainer}>
          <img className={styles.thumbnail} src={thumbnail} alt="" />
        </div>
        <div className={styles.info}>
          <div className={styles.header}>
            <img className={styles.profileImage} src={profileImage} alt="" />
            <span className={styles.username}>{username}</span>
          </div>
          <div className={styles.eventDetails}>
            <div className={styles.detail}>
              <span className={styles.key}>{"Title"}</span>
              {" : "} <span className={styles.value}>{title}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"Topic"}</span>
              {" : "} <span className={styles.value}>{topic}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"City & State"}</span>
              {" : "}
              <span className={styles.value}>{`${city}, ${state}`}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"Address"}</span>
              {" : "} <span className={styles.value}>{address}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"Time"}</span>
              {" : "}
              <span
                className={styles.value}
              >{`${startTime} - ${endTime}`}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"Event Dates"}</span>
              {" : "}
              <span
                className={styles.value}
              >{`${eventStartDate} - ${eventEndDate}`}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.key}>{"Registration Dates"}</span>
              {" : "}
              <span
                className={styles.value}
              >{`${registrationStartDate} - ${registrationEndDate}`}</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.detail}>
              <span className={styles.key}>{"About"}</span>
              {" : "}
              <span
                className={styles.value}
              >{aboutEvent}</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Event;

{
  /* <Panel shaded bordered bodyFill style={{ display: "inline-block", width: 300 }}>
  <img className={styles.thumbnail} src={thumbnail} alt="" />
  <Panel
    header={
      <>
        <div className={styles.header}>
          <img className={styles.profileImage} src={profileImage} alt="" />
          <span className={styles.username}>{username}</span>
        </div>
        <div className={styles.title}>{title}</div>
      </>
    }
  >
    {topic}
  </Panel>
</Panel>; */
}
