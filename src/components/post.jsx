import React, { useState, useContext } from "react";
import postStyle from "./post.module.css";
import DropDown from "./dropdown";
import { PostContext } from "./postContext";
import FullPost from "./fullPost";
import { Panel,Whisper,Popover,Dropdown } from "rsuite";

const Post = (props) => {
  const {
    postId,
    profileImage,
    username,
    postImage,
    postDescription,
    techUsed,
    likes,
    allComments,
    postedBy,
  } = props;
  const { deletePost, likePost, unlikePost, addNewPostComment } = useContext(
    PostContext
  );
  const userId = sessionStorage.getItem("userId");
  const [isFullPostOpen, setIsFullPostOpen] = useState(false);
  const triggerRef = React.createRef();
  const [selfLike, setSelfLike] = useState(() => {
    let isLiked = false;
    for (const index in likes) {
      if (likes[index].userId === userId) {
        isLiked = true;
        break;
      }
    }
    return isLiked;
  });
  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [newComment, setNewComment] = useState("");
  const [isImageContain, setIsImageContain] = useState(false);
  const [comments, setComments] = useState(allComments);
  const toggleLike = () => {
    setSelfLike(!selfLike);
  };
  const handleToggle = () => {
    setIsImageContain(!isImageContain);
  };
  const imageFit = (imageSource) => {
    if (isImageContain === true) {
      return (
        <img
          onClick={handleToggle}
          className={`${postStyle.image} ${postStyle.contain}`}
          src={imageSource}
          alt=""
        />
      );
    } else {
      return (
        <img
          onClick={handleToggle}
          className={`${postStyle.image} ${postStyle.cover}`}
          src={imageSource}
          alt=""
        />
      );
    }
  };
  const displayImage = () => {
    const imageSource = postImage;
    if (imageSource !== "") {
      return (
        <div className={postStyle.imageContainer}>
          <div className={postStyle.imageContainer}>
            {imageFit(imageSource)}
          </div>
        </div>
      );
    }
  };
  const displayTechUsed = () => {
    if (techUsed !== "" && techUsed !== null) {
      const techs = techUsed.split(",");
      return techs.map((tech) => {
        return (
          <div key={tech} className={postStyle.tech}>
            {tech}
          </div>
        );
      });
    }
  };
  const displayDescription = () => {
    if (postDescription !== "" && postDescription !== null) {
      return <p className={postStyle.description}>{postDescription}</p>;
    }
  };
  const displayLikeBtn = () => {
    if (selfLike === true) {
      return (
        <span
          className={`${postStyle.upVoteButton} ${postStyle.like}`}
          onClick={() => {
            toggleLike();
            setTotalLikes(totalLikes - 1);
            unlikePost(postId);
          }}
        >
          <i className="fas fa-heart"></i>
        </span>
      );
    } else {
      return (
        <span
          className={postStyle.upVoteButton}
          onClick={() => {
            toggleLike();
            setTotalLikes(totalLikes + 1);
            likePost(postId);
          }}
        >
          <i className="far fa-heart"></i>
        </span>
      );
    }
  };
  const handleSelectedOption = async (action) => {
    switch (action) {
      case "deletePost":
        const post = await deletePost(postId);
        if (post === "deleted") {
          alert("Post Has Been Deleted");
          window.location.reload();
        }
        break;
      default:
        console.log("Some thing out of the Box Happened");
        break;
    }
  };
  const showOptions = (options) => {
    return options.map(element => {
      return <Dropdown.Item eventKey={element.value}>{element.label}</Dropdown.Item>
    });
  }
  const MenuPopover = ({ onSelect,options, ...rest }) => (
    <Popover {...rest} full>
      <Dropdown.Menu onSelect={onSelect}>
        {showOptions(options)}
      </Dropdown.Menu>
    </Popover>
  );
  const handleSelectMenu = (eventKey, event) => {
    if (eventKey === 1) {
      handleSelectedOption("deletePost");
    }
    triggerRef.current.hide();
  };
  const showDropdown = () => {
    const options = [];
    if (postedBy === userId) {
      options.push({ value: 1, label: "Delete Post" });
    }
    return (
      <Whisper
        placement="rightStart"
        trigger="click"
        triggerRef={triggerRef}
        style={{ alignItems: "center" }}
        speaker={<MenuPopover options={options} onSelect={handleSelectMenu} />}
      >
        <i className="fas fa-ellipsis-v"></i>
      </Whisper>
    );
  };
  const handleNewComment = async () => {
    const comment = await addNewPostComment(postId, newComment);
    const commentsArray = comments;
    commentsArray.push(comment);
    setComments(commentsArray);
    // console.log(comments);
    setNewComment("");
  };
  const removeCommentFromList = (commentId) => {
    const filteredComments = comments.filter((comment) => {
      return comment.id !== commentId;
    });
    setComments(filteredComments);
  };
  const showNewCommentBtn = () => {
    if (newComment !== "") {
      return (
        <div onClick={handleNewComment} className={postStyle.postComment}>
          <span
            className={`${postStyle.postCommentBtn} ${postStyle.enableComment}`}
          >
            Post
          </span>
        </div>
      );
    } else {
      return (
        <div
          style={{ cursor: "not-allowed" }}
          className={postStyle.postComment}
        >
          <span className={postStyle.postCommentBtn}>Post</span>
        </div>
      );
    }
  };
  const displayNewCommentForm = () => {
    return (
      <div className={postStyle.addComment}>
        <input
          className={postStyle.newComment}
          type="text"
          placeholder="Add Comment"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />

        {showNewCommentBtn()}
      </div>
    );
  };
  const displayCommentBtn = () => {
    return <span
                style = {{cursor:"pointer"}}
                onClick={() => {
                  setIsFullPostOpen(!isFullPostOpen);
                }}
              >
                <i className="far fa-comment"></i>
              </span>
  }
  const showFullPost = () => {
    // console.log("Full Post Opened")
    if (isFullPostOpen === true) {
      return (
        <FullPost
          profileImage={profileImage}
          username={username}
          postImage={postImage}
          description={postDescription}
          selfLike={selfLike}
          likePost={toggleLike}
          likes={likes}
          comments={comments}
          isFullPostOpen={isFullPostOpen}
          setIsFullPostOpen={setIsFullPostOpen}
          displayImage={displayImage}
          displayDescription={displayDescription}
          showDropdown={showDropdown}
          displayLikeBtn={displayLikeBtn}
          displayTechUsed={displayTechUsed}
          displayNewCommentForm={displayNewCommentForm}
          removeCommentFromList={removeCommentFromList}
          displayCommentBtn={displayCommentBtn}
        />
      );
    }
  };
  return (
    <Panel
      shaded
      bodyFill
      style={{ backgroundColor: "white", margin: "15px 0", width: 600 }}
      header={
        <div className={postStyle.header}>
          <img id={postStyle.profilePic} src={profileImage} alt="" />
          <div className={postStyle.username}>{username}</div>
          <span className={postStyle.menu}>{showDropdown()}</span>
        </div>
      }
    >
      {displayImage()}
      <div className={postStyle.panelBody}>
        <div className={postStyle.techs}>{displayTechUsed()}</div>
        {displayDescription()}
        <div className={postStyle.options}>
          {displayLikeBtn()}
          {displayCommentBtn()}
          {showFullPost()}
        </div>
        <div className={postStyle.totalLikes}>{totalLikes} Likes</div>
      </div>
      {displayNewCommentForm()}
    </Panel>
  );
};

export default Post;