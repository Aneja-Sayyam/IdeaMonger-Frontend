import React ,{useContext} from "react";
import styles from "./postComment.module.css";
import { PostContext } from "./postContext";
import DropDown from "./dropdown";

const Comment = (props) => {
  const {
    username,
    profileImage,
    commentText,
    commentedBy,
    removeCommentFromList,
    commentId,
  } = props;
  const { removePostComment } = useContext(PostContext);
  const userId = sessionStorage.getItem("userId");
  const handleSelectedOption = async (action) => {
    switch (action) {
      case "removeComment":
        await removePostComment(commentId);
        removeCommentFromList(commentId);
        break;

      default:
        break;
    }
  };
  const showCommentDropdown = () => {
    const options = [];
    if (commentedBy === userId) {
      options.push({ value: "removeComment", label: "Remove Comment" });
    }
    return (
      <DropDown
        dropdownValue={<i className="fas fa-ellipsis-v"></i>}
        options={options}
        handleSelectedOption={handleSelectedOption}
      />
    );
  };
  return (
    <div className={styles.commentContainer}>
      <img
        className={styles.profileImage}
        src={profileImage}
        alt="profileImage"
      />
      <div className={styles.info}>
        <span className={styles.username}>
          {username}
          <span className={styles.commentText}>{commentText}</span>
        </span>
      </div>
      <div className={styles.commentMenu}>{showCommentDropdown()}</div>
    </div>
  );
};

export default Comment;
