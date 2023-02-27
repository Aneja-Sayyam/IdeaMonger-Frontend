import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  
  useEffect(() => {
    sessionStorage.setItem("userId", userId);
  }, [userId]);
  const loginUser = async (email, passwd) => {
    console.log(email, passwd);
    const body = {
      email: email,
      passwd: passwd,
    };
    const url = "http://localhost:3000/api/user/loginUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result.access === "granted") {
      setUserId(result.userId);
      console.log(result.userId);
      return true;
    } else {
      return false;
    }
  };
  const signUpUser = async (firstName, lastName, email, passwd) => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwd: passwd,
    };
    const url = "http://localhost:3000/api/user/createUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  };
  const followUser = async (follower, following) => {
    const body = {
      follower,
      following,
    };
    try {
      await fetch("http://localhost:3000/api/user/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async (follower, following) => {
    const body = {
      follower,
      following,
    };
    try {
      await fetch("http://localhost:3000/api/user/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowersFollowings = async (userId) => {
    console.log("getting followers and followings of -> ",userId)
    const body = {
      userId
    }
    const response = await fetch(
      "http://localhost:3000/api/user/getFollowersFollowings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    console.log("followers and followings -> ", result);
    // setFollowers(result.followers);
    // setFollowings(result.followings);
    return result;
  }
  return (
    <UserContext.Provider
      value={{ loginUser, signUpUser, followUser, unfollowUser,getFollowersFollowings }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
