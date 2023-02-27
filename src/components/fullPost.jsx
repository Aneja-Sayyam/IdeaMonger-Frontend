import React, { useState } from 'react';
import postStyle from "./fullPost.module.css";
import Comment from "./postComment";
import Modal from "react-modal";

const FullPost = (props) => {
  const {
    profileImage,
    username,
    postImage,
    // selfLike,
    likes,
    comments,
    // likePost,
    isFullPostOpen,
    setIsFullPostOpen,
    displayImage,
    displayDescription,
    showDropdown,
    displayLikeBtn,
    displayTechUsed,
    displayNewCommentForm,
    removeCommentFromList,
    displayCommentBtn
  } = props;
  

  const postWidth = () => {
    // const imageSource = postImage;
    if (postImage !== null) {
      return 1200;
    } else {
      return 600;
    }
  };
  
  const displayComments = () => {
    if (comments.length !== 0) {
      return comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            profileImage={comment.User.profile.profileImage}
            commentText={comment.text}
            username={`${comment.User.firstName} ${comment.User.lastName}`}
            commentedBy={comment.userId}
            removeCommentFromList={removeCommentFromList}
          />
        );
      });
    } else {
      return <span className={postStyle.noComments}>No Comments Posted Yet!</span>
    }
  };
  
  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(47, 47, 47, 0.685)",
    },
    content: {
      position: "absolute",
      border: "1px solid #ccc",
      // top: "20vh",
      margin: "auto",
      padding: "0",
      background: "#fff",
      overflow: "none",
      height: "fit-content",
      width: "fit-content",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTopLeftRadius: "40px"

    },
  };
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isFullPostOpen}
      style={modalStyles}
      onRequestClose={() => setIsFullPostOpen(false)}
    >
      <div style={{ width: postWidth }} className={postStyle.post}>
        {displayImage()}
        <div className={postStyle.details}>
          <div className={postStyle.header}>
            <img id={postStyle.profilePic} src={profileImage} alt="" />
            <span className={postStyle.username}>{username}</span>
            <span className={postStyle.menu}>{showDropdown()}</span>
          </div>
          {displayDescription()}
          <div className={postStyle.techs}>{displayTechUsed()}</div>
          <div className={postStyle.options}>
            <div className={postStyle.btns}>
              {displayLikeBtn()}
              {displayCommentBtn()}
            </div>
            <div className={postStyle.totalLikes}>{likes.length} Likes</div>
          </div>
          <div className={postStyle.viewComments}>{displayComments()}</div>
          {displayNewCommentForm()}
        </div>
      </div>
    </Modal>
  );
}
 
export default FullPost;

