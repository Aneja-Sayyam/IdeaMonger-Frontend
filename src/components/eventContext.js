import React, { createContext } from "react";
import { createEventUrl,findEventsUrl } from "../Urls/eventUrl";
export const EventContext = createContext();

export const EventContextProvider = (props) => {

  const createEvent = async (
    thumbnailSource,
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
    endTime
  ) => {
    const userId = sessionStorage.getItem("userId");
    const data = new FormData();
    data.append("thumbnailSource", thumbnailSource);
    data.append("aboutEvent", aboutEvent);
    data.append("topic", topic);
    data.append("title", title);
    data.append("city", city);
    data.append("state", state);
    data.append("address", address);
    data.append("eventStartDate", eventStartDate);
    data.append("eventEndDate", eventEndDate);
    data.append("registrationStartDate", registrationStartDate);
    data.append("registrationEndDate", registrationEndDate);
    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("userId", userId);
    console.log(data);
    await fetch(createEventUrl, {
      method: "POST",
      body: data,
    });
  };
  const getEvents = async() => {
    const response = await fetch(findEventsUrl);
    const result = await response.json();
    return result;
  }
  return (
    <EventContext.Provider value={{ createEvent,getEvents }}>
      {props.children}
    </EventContext.Provider>
  );
};
