import React, { useContext, useEffect, useState } from "react";
import CreateNewEvent from "./createNewEvent";
import NavBar from "./navbar";
import "./basicStyle.css";
import { ProfileContext } from "./profileContext";
import { CSSTransition } from "react-transition-group";
import "./transition.css";
import { EventContext } from "./eventContext";
import Event from "./event";
const EventPage = () => {
  const { profileImage, firstName, lastName, fetchProfileData } = useContext(
    ProfileContext
  );
  const { getEvents } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function initialize() {
      const userId = sessionStorage.getItem("userId");
      await fetchProfileData(userId);
      const events = await getEvents();
      setEvents(events);
    }
    initialize();
  }, []);
  const displayEvents = () => {
    return events.map((event) => {
      console.log(event);
      return <Event key={event.id} username={event.User.firstName +" "+event.User.lastName} profileImage={event.User.profile.profileImage} thumbnail={event.thumbnailSource} aboutEvent={event.aboutEvent} topic={event.topic} title={event.title} city={event.city} state={event.state} address={event.address} eventStartDate={event.EventStartDate} eventEndDate={event.EventEndDate} registrationStartDate={event.RegistrationStartDate} registrationEndDate={event.RegistrationEndDate} startTime={event.startTime} endTime={event.endTime} />
    })
  }
  return (
    <>
      <NavBar />
      <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
        <div className="container">
          <CreateNewEvent
            username={`${firstName} ${lastName}`}
            profileImage={profileImage}
          />
          {displayEvents()}
        </div>
      </CSSTransition>
    </>
  );
};

export default EventPage;
