import React, { Component } from "react";
import "./basicStyle.css";
import Profile from "./profile";
import NavBar from "./navbar";

class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Profile/>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
