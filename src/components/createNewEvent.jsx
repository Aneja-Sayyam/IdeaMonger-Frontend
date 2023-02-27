import React from "react";
import { useState, useContext } from "react";
import styles from "./newEvent.module.css";
import {
  DatePicker,
  Input,
  SelectPicker,
  // Whisper,
  // Tooltip,
  IconButton,
  Icon,
  Button,
  Panel,
  Notification,
  // Modal,
  DateRangePicker,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { locations } from "../informationComponents/locationData";
import { data } from "../informationComponents/programmingTech";
import { isBefore } from "date-fns";
import moment from "moment";
import "moment/locale/en-in";
import { EventContext } from "./eventContext";

const CreateNewEvent = (props) => {
  // const { profileImage, username } = props;
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topic, setTopic] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState();
  const [address, setAddress] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { beforeToday } = DateRangePicker;
  // const today = new Date();
  // const untilToday = today.setDate(today.getDate() - 1);
  let fileInput = null;

  // const tooltip = <Tooltip>Required</Tooltip>;
  const { createEvent } = useContext(EventContext);
  const selectFile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file !== undefined) {
      setThumbnail(file);
    }
  };
  // const displayHeader = () => {
  //   return (
  //     <div className={styles.header}>
  //       <img id={styles.profilePic} src={profileImage} alt="" />
  //       <div className={styles.username}>{username}</div>
  //     </div>
  //   );
  // };
  const displayThumbnailPreview = () => {
    if (thumbnail !== "") {
      const image = URL.createObjectURL(thumbnail);
      return (
        <div className={styles.thumbnailContainer}>
          <img className={styles.thumbnail} src={image} alt="" />
          <span
            onClick={() => {
              setThumbnail("");
            }}
            className={styles.removeBtn}
          >
            &times;
          </span>
        </div>
      );
    }
  };
  const displayUploadBtn = () => {
    return (
      <div className={styles.uploadBtn}>
        <input
          onChange={selectFile}
          type="file"
          ref={(ref) => {
            fileInput = ref;
          }}
          style={{ display: "none" }}
        />
        <IconButton
          onClick={() => fileInput.click()}
          icon={<Icon icon="attachment" />}
          circle
          size="md"
          appearance="default"
          color="blue"
        />
      </div>
    );
  };
  const displayForm = () => {
    return (
      <div className={styles.form}>
        <Input
          onChange={(value) => {
            setTitle(value);
          }}
          placeholder="Title"
          style={{ width: 515, color: "#1675e0" }}
        />

        <SelectPicker
          style={{ width: 250 }}
          data={data}
          groupBy="type"
          renderValue={(_, __) => {
            return `${topic}`
          }}
          onSelect={(_, item) => {
            setTopic(item.label);
          }}
          placeholder="Technology / Programming Language"
        />

        <SelectPicker
          style={{ width: 250 }}
          data={locations}
          renderValue={(_, __) => {
            return `${city}, ${state}`;
          }}
          placeholder="City &amp; State"
          onSelect={(_, item) => {
            setCity(item.label);
            setState(item.state);
          }}
          groupBy="state"
        />
        <DateRangePicker
          placeholder="Registration Date Range"
          showOneCalendar
          renderValue={(_, __) => {
            return `${registrationStartDate} - ${registrationEndDate}`;
          }}
          disabledDate={beforeToday()}
          style={{ width: 250 }}
          onChange={(values) => {
            moment.locale("en-in");
            const startDate = moment(values[0]).format("LL");
            const endDate = moment(values[1]).format("LL");
            setRegistrationStartDate(startDate);
            setRegistrationEndDate(endDate);
            // console.log(startDate,endDate);
          }}

        />
        <DateRangePicker
          placeholder="Event Date Range"
          showOneCalendar
          renderValue={(_, __) => {
            return `${eventStartDate} - ${eventEndDate}`;
          }}
          disabledDate={(date) =>
            isBefore(date, new Date(moment(registrationEndDate).add(1, "days")))
          }
          disabled={registrationEndDate === "" ? true : false}
          style={{ width: 250 }}
          onChange={(values) => {
            moment.locale("en-in");
            const startDate = moment(values[0]).format("LL");
            const endDate = moment(values[1]).format("LL");
            setEventStartDate(startDate);
            setEventEndDate(endDate);
            // console.log(startDate, endDate);
          }}
        />
        
        <DatePicker
          placeholder="Start Time"
          format="HH:mm"
          ranges={[]}
          // showMeridian
          onChange={(value) => {
            const time = moment(value).format("LT");
            setStartTime(time);
          }}
          style={{ width: 250 }}
        />

        <DatePicker
          placeholder="End Time"
          format="HH:mm"
          ranges={[]}
          // showMeridian
          onChange={(value) => {
            const time = moment(value).format("LT");
            setEndTime(time);
          }}
          style={{ width: 250 }}
        />

        <Input
          componentClass="textarea"
          rows={3}
          style={{ width: 515, resize: "none", color: "#1675e0" }}
          onChange={(value) => {
            setAddress(value);
          }}
          placeholder="Full Address"
        />

        <Input
          componentClass="textarea"
          rows={4}
          style={{ width: 515, resize: "none", color: "#1675e0" }}
          onChange={(value) => {
            setAboutEvent(value);
            // console.log(value);
          }}
          placeholder="About Event"
        />
      </div>
    );
  };
  const inputConfirmation = async() => {
    const inputsNotReceived = validateInput();
    if (inputsNotReceived.length !== 0) {
      Notification["warning"]({
        title: "No Input",
        duration: 10000,
        description: <div className="">{showInputsNotReceived(inputsNotReceived)}</div>,
      });
    } else {
      console.log("got every input");
      await createEvent(thumbnail, aboutEvent, topic, title, city, state, address, eventStartDate, eventEndDate, registrationStartDate, registrationEndDate, startTime, endTime);
      console.log("uploaded")
      window.location.reload();
    }
  };
  const showInputsNotReceived = (inputsNotReceived) => {
    return inputsNotReceived.map((variable) => {
      return (
        <div>
          <hr />
          <b>{variable}</b> was not provided.
        </div>
      );
    });
  };
  const validateInput = () => {
    const inputsNotReceived = [];
    if (thumbnail === "") inputsNotReceived.push("Thumbnail");
    if (title === "") inputsNotReceived.push("Title");
    if (topic === "") inputsNotReceived.push("Technology / Language");
    if (city === "") inputsNotReceived.push("Location");
    if (registrationStartDate === "") inputsNotReceived.push("Starting Date");
    if (eventStartDate === "") inputsNotReceived.push("Ending Date");
    if (startTime === "") inputsNotReceived.push("Starting Time");
    if (endTime === "") inputsNotReceived.push("Ending Time");
    if (address === "") inputsNotReceived.push("Address");
    if (aboutEvent === "") inputsNotReceived.push("About");
    return inputsNotReceived;
  };

  const submit = () => {
    // validateInput();
    inputConfirmation();
    Notification.close();
  };

  const displaySubmitBtn = () => {
    return (
      <div className={styles.submitBtn}>
        <Button onClick={submit} appearance="default" color="blue">
          Create New Event
        </Button>
      </div>
    );
  };
  return (
    <Panel
      header="Add New Event"
      bodyFill
      style={{ width: 600, background: "white" }}
      shaded
      collapsible
    >
      <div className={styles.container}>
        {/* {displayHeader()} */}
        <div className={styles.main}>
          {displayThumbnailPreview()}
          {displayForm()}
        </div>
        {displayUploadBtn()}
        {displaySubmitBtn()}
      </div>
    </Panel>
  );
};

export default CreateNewEvent;

// Learn Python
// Python
// Indore
// Acropolis Institute of Technology and Research
// Training in Python and its various libraries.