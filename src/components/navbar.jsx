import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import navStyle from "./nav.module.css";
import { ProfileContext } from "./profileContext";
import { Nav, Navbar, Icon, Popover, Dropdown, Whisper } from "rsuite";
import Search from "./search";

const NavBar = () => {
  const userId = sessionStorage.getItem("userId");
  const triggerRef = React.createRef();

  const { getProfileImage } = useContext(ProfileContext);

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    async function initialize() {
      const image = await getProfileImage(userId);
      setProfileImage(image);
    }
    initialize();
  }, []);
  
  const MenuPopover = ({ onSelect, ...rest }) => (
    <Popover {...rest} full>
      <Dropdown.Menu onSelect={onSelect}>
        <Dropdown.Item eventKey={1}>My Profile</Dropdown.Item>

        <Dropdown.Item eventKey={2}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
  const handleSelectMenu = (eventKey, event) => {
    // console.log(eventKey);
    if (eventKey === 1) {
      handleSelectedOption("openProfile");
    } else {
      if (eventKey === 2) {
        handleSelectedOption("logOut");
      }
    }
    triggerRef.current.hide();
  };
  const handleSelectedOption = (action) => {
    switch (action) {
      case "openProfile":
        window.open(`/profile/${userId}`, "_top");
        break;
      case "logOut":
        window.sessionStorage.setItem("userId", "");
        window.open("/", "_top");
        break;
      default:
        console.log("Some thing out of the Box Happened");
        break;
    }
  };
  return (
    <Navbar
      appearance="default"
      style={{
        display: "flex",
        height: 60,
        width: "100%",
        zIndex:2,
        boxShadow: "0px 1px 4px 0px",
        position: "fixed",
        justifyContent: "center",
      }}
    >
      <Navbar.Header>
        <Link
          style={{ textDecoration: "none" }}
          className={navStyle.link}
          to="/home"
        >
          <h4 className={navStyle.logo}>IdeaMonger</h4>
        </Link>
      </Navbar.Header>
      <Navbar.Body style={{ paddingLeft: 50}}>
        <Search apiUrl="http://localhost:3000/api/user/search" style={{ margin: "10px 30px" }} />
        <Nav justified style={{margin:"3px 0"}} pullRight appearance="subtle">
          <Link to="/home">
            <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
          </Link>
          <Link to="/events">
            <Nav.Item icon={<Icon icon="calendar" />}>Events</Nav.Item>
          </Link>
          <Link to="/chat">
            <Nav.Item icon={<Icon icon="comment-o" />}>Chat</Nav.Item>
          </Link>
          <Whisper
            placement="bottomEnd"
            trigger="click"
            triggerRef={triggerRef}
            style={{alignItems:"center"}}
            speaker={<MenuPopover onSelect={handleSelectMenu} />}
          >
            <div className={navStyle.profileImageContainer}>
              <img
                className={navStyle.profileImage}
                src={profileImage}
                alt=""
              />
            </div>
          </Whisper>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBar;

{
  /* <Dropdown
  toggleClassName={navStyle.toggleDropdown}
  noCaret
  placement="bottomStart"
  title={
    <div className={navStyle.profileImageContainer}>
      <img className={navStyle.profileImage} src={profileImage} alt="" />
    </div>
  }
>
  <Dropdown.Item
    onSelect={() => {
      handleSelectedOption("openProfile");
    }}
  >
    My Profile
  </Dropdown.Item>
  <Dropdown.Item
    onSelect={() => {
      handleSelectedOption("logOut");
    }}
  >
    Log Out
  </Dropdown.Item>
</Dropdown>; */
}
