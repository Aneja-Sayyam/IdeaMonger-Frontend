import React, { useContext,useState,useEffect } from 'react';
import NavBar from './navbar';
import NewPost from './newPost';
import { ProfileContext } from './profileContext';
import "./basicStyle.css";
import Post from "./post";
import { PostContext } from './postContext';
import { CSSTransition } from "react-transition-group";
import "./transition.css";

const Home = () => {
  const { profileImage, firstName, lastName ,fetchProfileData} = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const { fetchPosts } = useContext(PostContext);  
  useEffect(() => {
    async function initialize() {
      const posts = await fetchPosts();
      setPosts(posts);
      const userId = sessionStorage.getItem("userId");
      await fetchProfileData(userId);
    }
    initialize();
  }, []);
  const displayPosts = () => {
    return posts.map((post) => {
      return (
        <Post
          key={post.id}
          postId={post.id}
          postImage={post.imageSource}
          username={`${post.User.firstName} ${post.User.lastName}`}
          profileImage={post.User.profile.profileImage}
          postDescription={post.description}
          techUsed={post.mainTechUsed}
          likes={post.likedBy}
          allComments={post.commentBy}
          postedBy={post.userId}
        />
      );
    });
  }
  return (
    <React.Fragment>
      <NavBar />
      <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
        <div className="container">
          <NewPost
            username={`${firstName} ${lastName}`}
            profileImage={profileImage}
          />
          {displayPosts()}
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}
 
export default Home;