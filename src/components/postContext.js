import React, { createContext } from "react";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const deletePost = async (postId) => {
    const body = {
      postId: postId,
    };
    const url = "http://localhost:3000/api/post/removePostById";
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
  const fetchPosts = async () => {
    const userId = sessionStorage.getItem("userId");
    const body = {
      userId: userId,
    };
    const url = "http://localhost:3000/api/post/listAllPostsByUserId";
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
  const likePost = async (postId) => {
    const userId = sessionStorage.getItem("userId");
    const body = {
      userId: userId,
      postId: postId,
    };
    const url = "http://localhost:3000/api/post/likePost";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  const unlikePost = async (postId) => {
    const userId = sessionStorage.getItem("userId");
    const body = {
      userId: userId,
      postId: postId,
    };
    const url = "http://localhost:3000/api/post/unlikePost";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  const addNewPostComment = async (postId, commentText) => {
    const userId = sessionStorage.getItem("userId");
    const body = {
      userId: userId,
      postId: postId,
      text: commentText,
    };
    const url = "http://localhost:3000/api/post/createPostComment";

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
  const removePostComment = async (commentId) => {
    const body = {
      commentId
    };
    const url = "http://localhost:3000/api/post/removePostComment";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  return (
    <PostContext.Provider
      value={{ fetchPosts, deletePost, likePost, unlikePost, addNewPostComment,removePostComment}}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
